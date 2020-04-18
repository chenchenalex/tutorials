function log(A, B) {
  console.log("result: ", A, B);
}
console.log(require.main);
if (require.main === module) {
  // called via node repl mode
  module.export = log(process.argv[2], process.argv[3]);
} else {
  module.export = log;
}
