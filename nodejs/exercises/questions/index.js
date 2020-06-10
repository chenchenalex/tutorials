require("colors");
const { stdin, stdout } = require("process");
const fs = require("fs");
const readline = require("readline");
const path = require("path");

const userInterface = readline.createInterface(stdin, stdout);

const createProjectDirectory = (enteredName) => {
  const name = enteredName.trim();

  if (name === "") {
    console.error("Cannot create an folder with no name!".red);
    process.exit(0);
  }
  const projectPath = path.join(__dirname, name);

  if (fs.existsSync(projectPath)) {
    console.warn(`Folder ${projectPath} already exists`.yellow);
    process.exit(0);
  }

  console.log("New folder created".green);
  fs.mkdirSync(projectPath);
};

const onProjectInput = function (name) {
  userInterface.close();
  stdin.destroy();
  createProjectDirectory(name);
};

userInterface.question(
  " What is the name of your project\n - ",
  onProjectInput,
);
