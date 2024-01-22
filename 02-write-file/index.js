const { stdout, stdin, exit } = require("process");
const path = require("path");
const fs = require("fs");
const writeStream = fs.createWriteStream(path.join(__dirname, "yourtext.txt"), {flags: 'a', encoding: "utf-8"});

stdout.write("Hi! Write your text for your file here:\n")

stdin.on("data", (data) => {
  const writingText = data.toString().trim();
  if (writingText === "exit") {
    exit();
  } else {
    writeStream.write(writingText);
  }
})

process.on("SIGINT", () => {
  exit();
})
process.on("exit", () => stdout.write('Buy!'))
