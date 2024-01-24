const { join, extname } = require('path');
const fs = require('fs').promises;

const contentPath = join(__dirname, 'styles');
const newContentPath = join(__dirname, 'project-dist');
const newFileStyles =  join(newContentPath, 'bundle.css');

(async () => {
  await fs.mkdir(newContentPath, { recursive: true} );
  await fs.writeFile(newFileStyles, '');
  const files = await fs.readdir(contentPath);
  let fileNum = 0;
  for (const file of files) {
    fileNum += 1;
    const filePath = join(contentPath, file);
    const fileExt = extname(filePath);
    if (fileExt === '.css') {
      const fileText = await fs.readFile(filePath, 'utf-8');
      if (fileNum === 1) {
        await fs.writeFile(newFileStyles, fileText);
      } else {
        await fs.appendFile(newFileStyles, fileText);
      }
    }
  }
})();