// Привет, ревьюер) Я доделаю задачу 23.01. Извини, если доставил неудобства

const fs = require("fs").promises;
const { join } = require("path");

const filePathHtml = join(__dirname, "template.html");
const filePathTags = join(__dirname, "components");
const assetsPath = join(__dirname, "assets");
const stylePath = join(__dirname, "styles");
const newPath = join(__dirname, "project-dist");
const newPathIndex = join(__dirname, "project-dist", "index.html");
const newPathStyle = join(newPath, "style.css");
const newPathAssets = join(newPath, "assets");

(async () => {
    const template = await fs.readFile(filePathHtml, "utf-8");
    const allTags = await fs.readdir(filePathTags);
    let index = template;
    for (const tag of allTags) {
      const tagPath = join(__dirname, "components", tag);
      const tagContent = await fs.readFile(tagPath, "utf-8");
      index = index.replace(`{{${tag.replace(".html", "")}}}`, tagContent);
    }

    let style = '';
    const stylesFiles = await fs.readdir(stylePath);
    for (const file of stylesFiles) {
      const fileReaded = await fs.readFile(join(stylePath, file), "utf-8");
      style += fileReaded;
    }

    await fs.mkdir(newPath, { recursive: true });
    await fs.mkdir(newPathAssets, { recursive: true });
    await fs.writeFile(newPathIndex, index);
    await fs.writeFile(newPathStyle, style);

  (async () => {
    async function copyFolder(assetsPath, newPathAssets) {
      await fs.mkdir(newPathAssets, { recursive: true });
      const files = await fs.readdir(assetsPath);
      for (const file of files) {
        const sourcePath = join(assetsPath, file);
        const destinationPath = join(newPathAssets, file);
        const stats = await fs.stat(sourcePath);
        if (stats.isDirectory()) {
          await copyFolder(sourcePath, destinationPath);
        } else {
          await fs.copyFile(sourcePath, destinationPath);
        }
      }
    }
    await copyFolder(assetsPath, newPathAssets);
  })();
})();


