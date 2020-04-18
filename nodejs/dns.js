const dns = require("dns");

// dns.lookup("pluralsight.com", (err, address) => {
//   console.log(address);
// });

// dns.resolve4("google.com.au", (err, address) => {
//   console.log(address);
// });

// dns.resolveMx("google.com.au", (err, address) => {
//   console.log(address);
// });

// dns.resolve("pluralsight.com", "MX", (err, address) => {
//   console.log(address);
// });

dns.reverse("52.32.166.212", (err, host) => {
  console.log(host);
});
