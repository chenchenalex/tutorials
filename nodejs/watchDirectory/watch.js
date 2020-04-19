const fs = require("fs");
const path = require("path");
const dirname = path.join(__dirname, "files");
const watchedFiles = [];

const files = fs.readdirSync(dirname);

// watch all files
files.forEach((file) => {
  fs.watchFile(path.join(dirname, file), (curr, prev) => {
    if (curr.birthtimeMs === 0) {
      console.log(`${file} is deleted ${new Date()}`);
      watchedFiles.splice(watchedFiles.indexOf(file), 1);
      return;
    }
    if (curr.mtimeMs > prev.mtimeMs) {
      console.log(`${file} is modified ${new Date()}`);
    }
  });
  watchedFiles.push(file);
});

fs.watch(dirname, (e, file) => {
  // watch new file
  if (!watchedFiles.includes(file)) {
    console.log(`${file} is created! ${new Date()}`);

    fs.watchFile(path.join(dirname, file), (curr, prev) => {
      if (curr.birthtimeMs === 0) {
        console.log(`${file} is deleted ${new Date()}`);
        watchedFiles.splice(watchedFiles.indexOf(file), 1);
        return;
      }
      if (curr.mtimeMs > prev.mtimeMs) {
        console.log(`${file} is modified ${new Date()}`);
      }
    });
    watchedFiles.push(file);
  }
});
