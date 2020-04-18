const EventEmitter = require("events");
const ReadLine = require("readline");

const rl = ReadLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = new EventEmitter();
const server = require("./server")(client);

let command, args;
rl.on("line", (input) => {
  [command, ...args] = input.split(" ");
  client.emit("command", command, args);
});

server.on("response", (res) => {
  process.stdout.write("\u001B[2J\u001B[0;0f");
  process.stdout.write(res);
  process.stdout.write("\n>");
});
