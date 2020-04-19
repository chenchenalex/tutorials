const fs = require("fs");
const path = require("path");
const dirname = path.join(__dirname, "files");

const files = fs.readdirSync(dirname);
const oneDay = 1000 * 60 * 60 * 24;

files.forEach((file) => {
  const filePath = path.join(dirname, file);
  fs.stat(filePath, (err, stat) => {
    if (err) throw err;

    const birthTime = new Date(stat.birthtime).getTime();
    const now = Date.now();

    if (now - birthTime > oneDay * 7) {
      // remove file
      fs.unlink(filePath, (err) => {
        if (err) throw err;
      });
    }
  });
});
