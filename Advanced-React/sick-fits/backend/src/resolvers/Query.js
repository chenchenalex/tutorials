/* 
  {forwardTo} if there is nothing special handling needs to be done in backend, 
  we can simply forward the query directly to prisma 
*/
const { forwardTo } = require("prisma-binding");

const Query = {
  items: forwardTo("db"),
  item: forwardTo("db"),
  itemsConnection: forwardTo("db"),
};

module.exports = Query;
