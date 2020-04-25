const { spawn } = require("child_process");

const child = spawn("find", [".", "-type", "f"]);

child.stdout.on("data", (data) => {
  process.stdout.write(data);
});

child.stderr.on("data", (data) => {
  process.stderr.write(`${data}\n`);
});

child.on("exit", (code, signal) => {
  console.log(`child process exit with code ${code}, signal: ${signal}`);
});

// other event on child disconnect, close, message, error
// stdio objects stdin, stdout, stderr
