const server = require("http").createServer();

// http server
server.on("request", (req, res) => {
  // req: http imcoming message
  // res http server Response
  res.writeHead(401, { "content-type": "text/json" });
  res.end("hello world");
});

server.listen(8000);
