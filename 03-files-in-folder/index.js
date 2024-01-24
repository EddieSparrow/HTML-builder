const fs = require("fs").promises;
const path = require("path");
const { stdout } = require("process");

const contentPath = path.join(__dirname, "secret-folder");

(async () => {
  const files = await fs.readdir(contentPath);
  let isFirstFile = true;
  for (const file of files) {
    const filePath = path.join(contentPath, file);
    const { name, ext} = path.parse(filePath);
    const filesSize = await fs.stat(filePath);
    const isFile = (await fs.stat(filePath)).isFile();
    
    if (isFile) {
      if (!isFirstFile) {
        stdout.write("\n");
      }
      stdout.write(name);
      stdout.write("-" + ext.slice(1) + "-");
      stdout.write(filesSize.size.toString() + "byte");
      isFirstFile = false;
    }
  }
})();