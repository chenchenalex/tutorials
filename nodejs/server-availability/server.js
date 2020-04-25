const http = require("http");

http
  .createServer((req, res) => {
    for (let i = 0; i < 1e7; i++);
    res.write(`${process.pid} is current cluster node`);
    res.end(`Ok, handled by ${process.pid}`);
  })
  .listen(8080);

// random crashes to test server availability

// setTimeout(() => {
//   process.exit(1);
// }, Math.random() * 10000);
