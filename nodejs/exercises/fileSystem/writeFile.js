const fs = require("fs");
const path = require("path");
const dir = path.join(__dirname, "test");

const generatedData = "this is a generated file";

fs.writeFile(path.join(dir, "test1.js"), generatedData, (err) => {
  if (err) throw err;
  const DATE = 6;
  const MONTH = 8; // september
  fs.utimes(path.join(dir, "test1.js"), "", new Date(1992, MONTH, DATE), () => {
    console.log("File time updated");
  });
});
