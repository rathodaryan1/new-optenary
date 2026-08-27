import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pngPath = path.join(__dirname, '../public/images/aiautomation.png');
const webpPath = path.join(__dirname, '../public/images/aiautomation.webp');

async function convert() {
  try {
    if (!fs.existsSync(pngPath)) {
        console.error("png file not found");
        return;
    }
    await sharp(pngPath)
      .resize({ width: 1600 }) // Upscaled from 800 to 1600 for much better quality
      .webp({ quality: 95, effort: 6 }) // Max quality
      .toFile(webpPath);
    
    console.log("Successfully converted aiautomation.png to aiautomation.webp at high quality!");
  } catch (err) {
    console.error("Error converting image:", err);
  }
}

convert();
