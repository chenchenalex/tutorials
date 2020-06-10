const { platform } = require("os");
const { exec, spawn } = require("child_process");

const WINDOW_PLATFORM = "win32";

const osPlatform = platform();

const args = process.argv.slice(2);

const [url] = args;

if (url === undefined) {
  process.stdout.write("Plase enter a URL, eg. http://www.google.com ");
}
let command;
if (osPlatform !== WINDOW_PLATFORM) {
  command = `open -a 'Google Chrome' ${url}`;
}

// exec(command);
spawn("open", ["-a", "Google Chrome", url]);
