process.stdout.write("\u001B[2J\u001B[0;0f");
const net = require("net");
let counter = 0;
let sockets = {};

const server = net.createServer();

function timestamp() {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes()}`;
}
server.on("connection", (socket) => {
  console.log("client connected");
  socket.id = counter++;

  socket.write("Please provide your name:\n");

  socket.on("data", (data) => {
    if (!sockets[socket.id]) {
      socket.name = data.toString().trim();
      socket.write(`Welcome, ${socket.name}!\n`);
      sockets[socket.id] = socket;
      return;
    }

    Object.entries(sockets).forEach(([key, sc]) => {
      if (socket.id.toString() === key) return;
      sc.write(`${socket.name} .... ${timestamp()}: `);
      sc.write(data);
    });
  });

  socket.on("end", () => {
    delete sockets[socket.id];
    console.log(`user ${socket.id} disconnected!`);
  });
});

server.listen(8000, () => console.log("server bound"));

// client
// use nc localhost 8000
