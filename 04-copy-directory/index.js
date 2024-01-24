const { error } = require('console');
const { join } = require('path');

const fs = require('fs').promises;
const folderPath = join(__dirname, 'files');

(async () => {
  const files = await fs.readdir(folderPath);
  const folderCopyPath = join(__dirname, 'files-copy');
  await fs.mkdir(folderCopyPath, { recursive: true });

  for (const file of files) {
    const srcFilePath = join(folderPath, file);
    const dstFilePath = join(folderCopyPath, file);
    await fs.copyFile(srcFilePath, dstFilePath);
  }
})()