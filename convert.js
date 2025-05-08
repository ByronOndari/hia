const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname); // Adjust if needed

function moveHtmlFilesToFolders(dir) {
    fs.readdirSync(dir).forEach((file) => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            moveHtmlFilesToFolders(fullPath);
        } else if (stat.isFile() && file.endsWith('.html') && file !== 'index.html') {
            const name = file.replace('.html', '');
            const newFolder = path.join(dir, name);

            fs.mkdirSync(newFolder, { recursive: true });
            fs.renameSync(fullPath, path.join(newFolder, 'index.html'));

            console.log(`Moved ${file} → ${name}/index.html`);
        }
    });
}

moveHtmlFilesToFolders(rootDir);
