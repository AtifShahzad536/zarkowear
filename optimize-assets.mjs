import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');
const SPORTS_DIR = path.join(IMAGES_DIR, 'sports');

console.log('--- Starting Image Optimizations ---');

// 1. Convert new-logo.png to new-logo.webp (and compress new-logo.png)
const logoPng = path.join(PUBLIC_DIR, 'new-logo.png');
if (fs.existsSync(logoPng)) {
  console.log('Optimizing logo...');
  execSync(`npx sharp-cli -i "${logoPng}" -o "${PUBLIC_DIR}" -f webp -q 85 resize 160`, { stdio: 'inherit' });
}

// 2. Compress and resize sports category webp images (target max width 400, quality 75)
const sportsFiles = fs.readdirSync(SPORTS_DIR).filter(f => f.endsWith('.webp') || f.endsWith('.png'));
sportsFiles.forEach(file => {
  const filePath = path.join(SPORTS_DIR, file);
  console.log(`Optimizing sports image: ${file}`);
  try {
    execSync(`npx sharp-cli -i "${filePath}" -o "${SPORTS_DIR}" -f webp -q 75 resize 400`, { stdio: 'inherit' });
  } catch (err) {
    console.error(`Error optimizing ${file}:`, err.message);
  }
});

// 3. Compress and resize hero jersey webp images (target max width 380, quality 80)
const heroJerseys = ['hero_football.webp', 'hero_basketball.webp', 'hero_cricket.webp', 'hero_gym.webp', 'hero_wrestling.webp'];
heroJerseys.forEach(file => {
  const pngEquivalent = file.replace('.webp', '.png');
  const srcFile = path.join(IMAGES_DIR, fs.existsSync(path.join(IMAGES_DIR, pngEquivalent)) ? pngEquivalent : file);
  console.log(`Optimizing hero jersey: ${file} from source ${path.basename(srcFile)}`);
  try {
    execSync(`npx sharp-cli -i "${srcFile}" -o "${IMAGES_DIR}" -f webp -q 80 resize 380`, { stdio: 'inherit' });
  } catch (err) {
    console.error(`Error optimizing ${file}:`, err.message);
  }
});

console.log('--- Image Optimizations Complete ---');
