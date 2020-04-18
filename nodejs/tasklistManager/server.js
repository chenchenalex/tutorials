const EventEmitter = require("events");

class Server extends EventEmitter {
  constructor(client) {
    super();
    process.nextTick(() => {
      this.emit("response", "type command (type help to list commands)");
    });
    client.on("command", (command, args) => {
      switch (command) {
        case "help":
        case "ls":
        case "add":
        case "delete":
          this[command](args);
          break;
        default:
          this.emit("response", "unknown");
      }
    });
  }

  help() {
    this.emit("response", "help...");
  }

  ls() {
    this.emit("response", "ls...");
  }

  add(args) {
    this.emit("response", args.join(" "));
  }
  delete() {
    this.emit("response", "delete...");
  }
}

module.exports = (client) => new Server(client);
