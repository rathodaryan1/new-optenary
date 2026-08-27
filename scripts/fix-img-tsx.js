import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '../src');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      walkDir(dirPath, callback);
    } else {
      callback(path.join(dir, f));
    }
  });
}

let updatedCount = 0;
walkDir(rootDir, (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    content = content.replace(/<img([^>]*?)\/([^>]*?)>/g, (match, beforeSlash, afterSlash) => {
       return `<img${beforeSlash}${afterSlash} />`;
    });
    
    if (content !== original) {
       fs.writeFileSync(filePath, content, 'utf8');
       console.log("Fixed:", filePath);
       updatedCount++;
    }
  }
});
console.log("Done fixing", updatedCount, "files.");
