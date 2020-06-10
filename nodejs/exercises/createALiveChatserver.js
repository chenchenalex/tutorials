const net = require("net");

const server = net.createServer();
let availableUserSockets = [];
let id = 0;
server
  .on("connection", (socket) => {
    socket.id = id;
    console.log(`socket ${socket.id} is connected`);
    id += 1;
    availableUserSockets.push(socket);

    socket.on("data", (data) => {
      availableUserSockets.forEach((userSocket) => {
        if (userSocket.id !== socket.id) {
          userSocket.write(`User-${socket.id}: ${data}`);
        }
      });
    });

    socket.on("close", () => {
      console.log(`socket ${socket.id} is disconnected`);
      availableUserSockets = availableUserSockets.filter(
        (item) => item.id != socket.id,
      );
      console.log(availableUserSockets);
    });
  })
  .listen("8000", () => {
    console.log("Server started");
  });
