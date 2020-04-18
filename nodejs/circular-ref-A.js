module.exports = ["A"];

const refB = require("./circular-ref-B");
module.exports.push(111);
module.exports.push(11111);

console.log("refB is loaded", refB, module);
