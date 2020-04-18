const https = require("https");

// req: http.clientRequest
const req = https.get("https://www.google.com", (res) => {
  // res https incoming message
  console.log(res.status);
  console.log(res.headers);

  res.on("data", (data) => {});
});

req.on("error", (err) => console.log(err));

// http agent
console.log(req.agent);
