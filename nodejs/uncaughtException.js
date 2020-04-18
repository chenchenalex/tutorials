// process.on("exit", (err) => {
//   console.log("process is exiting");
// });

// do not use uncaughtException as it will prevent app from exiting on uncaughtError
process.on("uncaughtException", (err) => {
  console.log(err);

  // Force exit
  process.exit(1);
});

// keep event loop busy
process.stdout.resume();

console.dog(123);
