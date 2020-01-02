/* 
  {forwardTo} if there is nothing special handling needs to be done in backend, 
  we can simply forward the query directly to prisma 
*/
const { forwardTo } = require("prisma-binding");

const Query = {
  items: forwardTo("db"),
  item: forwardTo("db"),
  itemsConnection: forwardTo("db"),
  me(parent, ctx, args, info) {
    // check if there's a user id found in /index.js
    if (!args.request.userId) {
      return null;
    }

    return args.db.query.user({ where: { id: args.request.userId } }, info);
  },
};

module.exports = Query;
