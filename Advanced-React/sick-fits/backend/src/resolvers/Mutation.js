const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const mutations = {
  async createItem(parent, args, ctx, info) {
    // pass info to the mutation because it contains actual query from frontend like what's needed as result
    // TODO check if user is logged in
    const item = await ctx.db.mutation.createItem(
      {
        data: { ...args },
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
      `{id title}`,
    );
    // 2.check if they have the permission
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

    // create a jwt token once user is signed up
    const token = jwt.sign({ signId: user.id }, process.env.APP_SECRET);
    // provide the token in the response cookie and user will be signed in

    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
    });

    return user;
  },
};

module.exports = mutations;
