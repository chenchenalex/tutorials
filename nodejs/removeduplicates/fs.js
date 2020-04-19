const fs = require("fs");
const path = require("path");

// fs.readFile("./duplicate.js", (err, info) => {
//   if (err) throw err;

//   fs.writeFile(
//     "./duplicate.js",
//     info.slice(0, info.length / 2),
//     (err, result) => {
//       if (err) throw err;
//       console.log(result);
//     },
//   );
// });

// solution

const dirname = path.join(__dirname, "files");
const files = fs.readdirSync(dirname);

console.log(files);
// files ['duplicate.js']

files.forEach((file) => {
  const filePath = path.join(dirname, file);
  fs.stat(filePath, (err, stats) => {
    if (err) throw err;

    fs.truncate(filePath, Math.floor(stats.size / 2), (err) => {
      if (err) throw err;
    });
  });
});
