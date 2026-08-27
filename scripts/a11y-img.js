import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '../src');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(path.join(dir, f));
    }
  });
}

function processFiles() {
  let updatedCount = 0;
  walkDir(rootDir, (filePath) => {
    if (filePath.endsWith('.tsx')) {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      
      // regex to find <img ... /> or <img>
      // Add loading="lazy" decoding="async" if not present
      content = content.replace(/<img([^>]*)>/g, (match, attrs) => {
        let newAttrs = attrs;
        
        if (!/loading=/.test(newAttrs)) {
          // If it's a hero image (usually the very first one or has 'logo'), maybe don't lazy load, but for simplicity we add it. 
          // Let's not add to logo since it's above the fold.
          if (!newAttrs.includes('logo')) {
            newAttrs += ' loading="lazy"';
          }
        }
        if (!/decoding=/.test(newAttrs)) {
          newAttrs += ' decoding="async"';
        }
        if (!/alt=/.test(newAttrs)) {
          newAttrs += ' alt="Optenary illustration"';
        }
        
        return `<img${newAttrs}>`;
      });
      
      // Update social links aria-labels if missing
      content = content.replace(/<a([^>]*href="[^"]*instagram[^"]*"[^>]*)>/gi, (match, attrs) => {
        return attrs.includes('aria-label') ? match : `<a${attrs} aria-label="Instagram">`;
      });
      content = content.replace(/<a([^>]*href="[^"]*linkedin[^"]*"[^>]*)>/gi, (match, attrs) => {
        return attrs.includes('aria-label') ? match : `<a${attrs} aria-label="LinkedIn">`;
      });
      content = content.replace(/<a([^>]*href="[^"]*facebook[^"]*"[^>]*)>/gi, (match, attrs) => {
        return attrs.includes('aria-label') ? match : `<a${attrs} aria-label="Facebook">`;
      });
      content = content.replace(/<a([^>]*href="mailto:[^"]*"[^>]*)>/gi, (match, attrs) => {
        return attrs.includes('aria-label') ? match : `<a${attrs} aria-label="Email Optenary">`;
      });

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated A11y in: ${filePath}`);
        updatedCount++;
      }
    }
  });
  console.log(`Finished updating ${updatedCount} files for accessibility.`);
}

processFiles();
