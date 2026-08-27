import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '../');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory && !dirPath.includes('node_modules') && !dirPath.includes('.git') && !dirPath.includes('dist')) {
      walkDir(dirPath, callback);
    } else if (!isDirectory) {
      callback(path.join(dir, f));
    }
  });
}

function processFiles() {
  let updatedCount = 0;
  walkDir(rootDir, (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    if (['.tsx', '.ts', '.html', '.css'].includes(ext)) {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      
      // We know all images were converted to .webp, so replace references in src attributes and css imports
      // Regex replaces .png, .jpg, .jpeg to .webp
      content = content.replace(/\.(png|jpg|jpeg)(["']|\s|\))/gi, '.webp$2');
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated references in: ${filePath}`);
        updatedCount++;
      }
    }
  });
  console.log(`Finished updating ${updatedCount} files.`);
}

processFiles();
