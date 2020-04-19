const server = require("http").createServer();
const fs = require("fs");

// http server
// use curl localhost:8000 or visit via browser
server.on("request", (req, res) => {
  // req: http imcoming message
  // res http server Response

  switch (req.url) {
    case "/api":
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ data: "here" }));
      break;
    case "/":
    case "/home":
      res.writeHead(200, { "content-type": "text/html" });
      res.end(fs.readFileSync("./index.html"));
      break;
    case "/about":
      res.writeHead(301, { location: "/home" });
      res.end();
    default:
      res.writeHead(200, { "content-type": "text/html" });
      res.end("You reached a no man's land");
  }
});

server.listen(8000);
