const fs = require("fs");

const file = fs.createWriteStream("./big.file");

for (let i = 0; i < 1e6; i++) {
  file.write("123123123 123123 123132131313213 131");
}

file.end();
