const http = require("http");

http
  .createServer((req, res) => {
    for (let i = 0; i < 1e7; i++);
    res.end(`Ok, handled by ${process.pid}`);
  })
  .listen(8080);

process.on("message", (msg) => {
  console.log("Message from master:" + msg);
});
