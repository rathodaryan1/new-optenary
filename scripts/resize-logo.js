import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imagePath = path.join(__dirname, '../public/images/logo.webp');
const tempPath = path.join(__dirname, '../public/images/logo-temp.webp');

async function resize() {
  try {
    const buffer = await sharp(imagePath)
      .resize({ height: 128 }) 
      .webp({ quality: 80, effort: 6 })
      .toBuffer();
    
    fs.writeFileSync(tempPath, buffer);
    fs.renameSync(tempPath, imagePath);
    console.log("Successfully resized logo.webp!");
  } catch (err) {
    console.error("Error resizing logo:", err);
  }
}

resize();
