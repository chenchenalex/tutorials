// run detached process standalone
const { spawn } = require("child_process");

const child = spawn("node", ["spawn.js"], {
  detached: true,
  stdio: "ignore",
});
