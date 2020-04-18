const fs = require("fs");

const server = require("https").createServer({
  cert: fs.readFileSync("./cert.pem"),
  key: fs.readFileSync("./key.pem"),
});

server.on("request", (req, res) => {
  res.writeHead(200, { "content-type": "text/text" });
  res.end("hello world");
});

server.listen(443);
