import { Resolver, InputType, Field, Mutation, Arg, Ctx, ObjectType, Query } from "type-graphql";
import { MyContext } from "src/types";
import { User } from "../entity/User";
import argon2 from "argon2";

@InputType()
class UserNamePasswordInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, em }: MyContext): Promise<User | null> {
    // you are not logged in
    if (!req.session.userId) {
      return null;
    }

    const user = await em.findOne(User, { id: req.session.userId });
    return user;
  }

  @Mutation(() => UserResponse)
  async register(@Arg("options") options: UserNamePasswordInput, @Ctx() { em, req }: MyContext): Promise<UserResponse> {
    const hashedPassword = await argon2.hash(options.password);
    if (options.username.length <= 2) {
      return {
        errors: [
          {
            field: "username",
            message: "length must be great than 2",
          },
        ],
      };
    }

    if (options.password.length <= 3) {
      return {
        errors: [
          {
            field: "password",
            message: "length must be great than 3",
          },
        ],
      };
    }

    const user = em.create(User, {
      username: options.username,
      password: hashedPassword,
    });
    // log user in after register
    req.session.userId = user.id;

    await em.persistAndFlush(user);

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(@Arg("options") options: UserNamePasswordInput, @Ctx() { em, req }: MyContext): Promise<UserResponse> {
    const user = await em.findOne(User, { username: options.username });

    if (!user) {
      // can't find a user
      return {
        errors: [
          {
            field: "username",
            message: "that username does not exist",
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, options.password);

    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "password is wrong",
          },
        ],
      };
    }

    req.session.userId = user.id;

    return { user };
  }
}
