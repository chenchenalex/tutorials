/* 
  {forwardTo} if there is nothing special handling needs to be done in backend, 
  we can simply forward the query directly to prisma 
*/
const { forwardTo } = require("prisma-binding");
const { hasPermission } = require("../utils");

const Query = {
  items: forwardTo("db"),
  item: forwardTo("db"),
  itemsConnection: forwardTo("db"),
  me(parent, args, ctx, info) {
    // check if there's a user id found in /index.js
    if (!ctx.request.userId) {
      return null;
    }

    return ctx.db.query.user({ where: { id: ctx.request.userId } }, info);
  },
  async users(parent, args, ctx, info) {
    // check if logged in
    if (!ctx.request.userId) return new Error("You need to logged in");

    // check if the user has permission to check other user's permission
    hasPermission(ctx.request.user, ["ADMIN", "PERMISSIONUPDATE"]);

    // if they do, query all users
    return ctx.db.query.users({}, info);
  },
};

module.exports = Query;
