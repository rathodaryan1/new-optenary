import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pngPath = path.join(__dirname, '../public/images/logo.png');
const webpPath = path.join(__dirname, '../public/images/logo.webp');

async function convert() {
  try {
    await sharp(pngPath)
      .resize({ height: 128 }) 
      .webp({ quality: 90, effort: 6 })
      .toFile(webpPath);
    
    console.log("Successfully converted logo.png to logo.webp and resized it!");
  } catch (err) {
    console.error("Error converting logo:", err);
  }
}

convert();
