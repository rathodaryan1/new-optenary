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

walkDir(rootDir, (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    content = content.replace(/\/\s*loading=/g, 'loading=');
    content = content.replace(/\/\s*decoding=/g, 'decoding=');
    content = content.replace(/\/\s*alt=/g, 'alt=');
    
    if (content !== original) {
       fs.writeFileSync(filePath, content, 'utf8');
       console.log("Cleaned:", filePath);
    }
  }
});
console.log("Cleanup complete.");
