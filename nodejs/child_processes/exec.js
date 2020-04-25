const { exec, spawn } = require("child_process");

// exec command
// exec("find . -type f | wc -l", (err, stdout, stderr) => {
//   if (stderr) throw stderr;
//   console.log(stdout);
// });

// // spawn ver

// spawn("find . -type f | wc -l", {
//   stdio: "inherit",
//   shell: true,
//   cwd: __dirname,
// });

const child = spawn("echo $answer", {
  stdio: "inherit",
  shell: true,
  env: { answer: 42 },
});
