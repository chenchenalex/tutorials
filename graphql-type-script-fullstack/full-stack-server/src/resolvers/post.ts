import { isAuth } from "../middleware/isAuth";
import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Int, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Post } from "../entity/Post";

@InputType()
class PostInput {
  @Field()
  title: string;

  @Field()
  text: string;
}

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    return Post.find();
  }

  @Query(() => Post, { nullable: true })
  post(@Arg("id", () => Int) id: number): Promise<Post | undefined> {
    return Post.findOne(id);
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(@Arg("input") input: PostInput, @Ctx() { req }: MyContext): Promise<Post> {
    // 2 sql series
    return Post.create({ ...input, creatorId: req.session.userId }).save();
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(@Arg("id") id: number, @Arg("title", { nullable: true }) title: string): Promise<Post | null> {
    const post = await Post.findOne(id);
    if (!post) {
      return null;
    }

    if (typeof title !== "undefined") {
      await Post.update({ id }, { title });
    }

    return post;
  }

  @Mutation(() => Boolean, { nullable: true })
  async deletePost(@Arg("id") id: number): Promise<boolean> {
    try {
      await Post.delete(id);
      return true;
    } catch (e) {
      return false;
    }
  }
}
