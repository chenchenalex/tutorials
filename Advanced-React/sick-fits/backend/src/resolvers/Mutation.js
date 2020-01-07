const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { randomBytes } = require("crypto");
const { promisify } = require("util");
const { transport, makeANiceEmail } = require("../mail");
const { hasPermission } = require("../utils");

function setResponseCookie(ctx, userId) {
  // create a jwt token once user is signed up
  const token = jwt.sign({ signId: userId }, process.env.APP_SECRET);
  // provide the token in the response cookie and user will be signed in

  ctx.response.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
  });
}

const mutations = {
  async createItem(parent, args, ctx, info) {
    // pass info to the mutation because it contains actual query from frontend like what's needed as result
    // TODO check if user is logged in
    if (!ctx.request.userId) {
      throw new Error("You are not logged in, can't sell item");
    }

    const item = await ctx.db.mutation.createItem(
      {
        data: {
          ...args,
          // relationship between item and user
          user: {
            connect: {
              id: ctx.request.userId,
            },
          },
        },
      },
      info,
    );

    return item;
  },

  updateItem(parent, args, ctx, info) {
    const updates = { ...args };
    // not updating the id
    delete updates.id;

    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: { id: args.id },
      },
      info,
    );
  },

  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };
    // 1. find the item
    const item = await ctx.db.query.item(
      {
        where,
      },
      `{id title user{id}}`,
    );
    // 2.check if they have the permission
    const ownsItem = item.user.id === ctx.request.userId;
    const hasPermissions = ctx.request.user.permissions.some(permission =>
      ["ADMIN", "ITEMDELETE"].includes(permission),
    );
    if (!ownsItem && !hasPermissions)
      throw new Error("You do not have permission to delete");
    // 3. delete it
    return ctx.db.mutation.deleteItem(
      {
        where,
      },
      info,
    );
  },

  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    const existingUser = await ctx.db.query.user({
      where: {
        email: args.email,
      },
    });

    if (existingUser !== null) {
      // user email is already registered
      return new Error(`user is already exist: ${args.email}`);
    }

    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ["USER"] },
        },
      },
      info,
    );

    setResponseCookie(ctx, user.id);

    return user;
  },

  async signin(parent, { email, password }, ctx, info) {
    const user = await ctx.db.query.user({ where: { email } });

    // check if user exist
    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }

    // check if their password is correct
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error("Invalid password");
    }
    // generate JWT and set to response
    setResponseCookie(ctx, user.id);
    // return user

    return user;
  },

  signout(parent, args, ctx, info) {
    ctx.response.clearCookie("token");
    return {
      message: "You are not signed out successfully",
    };
  },

  async requestReset(parent, { email }, ctx, info) {
    // 1. check if the user does exist
    const user = await ctx.db.query.user({ where: { email } });

    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }
    // 2. generate a reset token and reset expiry date
    const promisifiedRandomBytes = promisify(randomBytes);
    const resetToken = (await promisifiedRandomBytes(20)).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000; // one hour from now
    const res = ctx.db.mutation.updateUser({
      data: { resetToken, resetTokenExpiry },
      where: { email },
    });

    // 3. send an email to the email address
    const mailResponse = await transport.sendMail({
      from: "chenchenalex1@gmail.com",
      to: user.email,
      subject: "Your password reset token",
      html: makeANiceEmail(`Your password reset token is
      \n\n <a href="${process.env.FRONTEND_URL}/resetPassword?resetToken=${resetToken}">Click here</a>
      `),
    });
    // 4. return success message
    return { message: "Thanks!" };
  },

  async resetPassword(
    parent,
    { resetToken, password, confirmPassword },
    ctx,
    info,
  ) {
    // 1. check if the passwords are match
    if (password !== confirmPassword) {
      throw Error("Password doesn't match");
    }
    // 2. check if the reset token is legit
    // 3. check if the token is expired
    const [user] = await ctx.db.query.users({
      where: {
        resetToken,
        resetTokenExpiry_gte: Date.now(),
      },
    });

    if (!user) {
      throw Error("This token is either invalid or expired");
    }
    // 4. hash new password
    const newPassword = await bcrypt.hash(password, 10);
    // 5. save new password and remove resetToken, token expiryData
    const newUser = await ctx.db.mutation.updateUser({
      where: { email: user.email },
      data: { password: newPassword, resetToken: null, resetTokenExpiry: null },
    });
    // 6. generate JWT
    // 7. save jwt to response
    setResponseCookie(ctx, newUser.id);

    // 8. return user
    return newUser;
  },

  async updatePermissions(parent, args, ctx, info) {
    // first check logged in status
    if (!ctx.request.userId) {
      throw new Error("You must be logged in");
    }
    // query current user
    const user = await ctx.db.query.user(
      { where: { id: ctx.request.userId } },
      info,
    );
    // check permission to update
    hasPermission(user, ["ADMIN", "PERMISSIONUPDATE"]);
    // update permissions
    return ctx.db.mutation.updateUser(
      {
        data: {
          permissions: {
            set: args.permissions,
          },
        },
        where: { id: args.userId },
      },
      info,
    );
  },

  async addToCart(parent, args, ctx, info) {
    // make sure they are signed in
    const { userId } = ctx.request;
    if (!userId) throw new Error("You must first signed in");
    // query the user current cart
    const [existingCartItem] = await ctx.db.query.cartItems({
      where: { user: { id: userId }, item: { id: args.id } },
    });
    // check if item is already in the cart increment by one if it is
    if (existingCartItem) {
      console.log("item already in cart");
      return ctx.db.mutation.updateCartItem(
        {
          where: { id: existingCartItem.id },
          data: {
            quantity: existingCartItem.quantity + 1,
          },
        },
        info,
      );
    }
    // if not , create a new cart item for the user
    return ctx.db.mutation.createCartItem(
      {
        data: {
          quantity: 1,
          item: {
            connect: { id: args.id },
          },
          user: {
            connect: { id: userId },
          },
        },
      },
      info,
    );
  },
};

module.exports = mutations;
