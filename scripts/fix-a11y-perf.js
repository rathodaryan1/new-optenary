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

    // Fix contrast: Replace text-white with text-dark-bg on brand colored buttons
    // We will find instances of bg-brand-emerald and replace text-white with text-dark-bg
    content = content.replace(/(bg-brand-(?:emerald|orange)(?:Dark)?\b[^"']*)text-white/g, '$1text-dark-bg');
    content = content.replace(/(text-brand-(?:emerald|orange)\b[^"']*)bg-brand-(?:emerald|orange)\/10/g, '$1bg-brand-emerald/20'); // Darken subtle backgrounds? No needed.

    if (filePath.endsWith('CookieConsent.tsx')) {
        content = content.replace('setTimeout(() => setVisible(true), 1500)', 'setTimeout(() => setVisible(true), 5500)');
    }

    if (filePath.endsWith('App.tsx')) {
        content = content.replace("import StickyBookCTA from './components/StickyBookCTA';", "const StickyBookCTA = lazy(() => import('./components/StickyBookCTA'));");
        content = content.replace("import CookieConsent from './components/CookieConsent';", "const CookieConsent = lazy(() => import('./components/CookieConsent'));");
        
        // Wrap them in Suspense
        content = content.replace(
            "<StickyBookCTA />\n      <CookieConsent />",
            "<Suspense fallback={null}>\n        <StickyBookCTA />\n        <CookieConsent />\n      </Suspense>"
        );
    }

    if (content !== original) {
       fs.writeFileSync(filePath, content, 'utf8');
       console.log("Updated: " + filePath);
    }
  }
});
