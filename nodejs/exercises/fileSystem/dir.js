const fs = require("fs");
const path = require("path");

const testFolder = path.join(__dirname, "test");
// fs.opendir("./", (err, dir) => {
//   console.log(dir);
// });

fs.readdir("./test", (err, files) => {
  if (err) {
    fs.mkdirSync("./test");
  }
  const dir = fs.opendir("./test", (err, dir) => {
    console.log(dir.path);
  });
});

fs.watch(testFolder, (event, filename) => {
  if (event === "rename") {
    // either create or update a file
    console.log();
    return;
  }

  // change a file
  console.log(`${filename} is change`);
});
