import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.join(__dirname, '../public/images');

async function processImages() {
  try {
    const files = await fs.promises.readdir(directoryPath);
    
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        const filePath = path.join(directoryPath, file);
        const nameWithoutExt = path.basename(file, ext);
        const newFilePath = path.join(directoryPath, `${nameWithoutExt}.webp`);
        
        console.log(`Converting ${file} to ${nameWithoutExt}.webp...`);
        
        await sharp(filePath)
          .webp({ quality: 80 })
          .toFile(newFilePath);
          
        // Delete original file
        await fs.promises.unlink(filePath);
        console.log(`Deleted original: ${file}`);
      }
    }
    console.log('Finished converting all images to WebP!');
  } catch (err) {
    console.error('Error processing images:', err);
  }
}

processImages();
