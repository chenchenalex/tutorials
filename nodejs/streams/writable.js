const { Writable } = require("stream");

const outputStream = new Writable({
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  },
});

process.stdin.pipe(outputStream);

// process.stdin.pipe(process.stdout)
