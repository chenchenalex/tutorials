module.exports = ["B"];

const refA = require("./circular-ref-A");

console.log("circular ref A content ", refA, module);
module.exports.push(222);
module.exports.push(22222);
