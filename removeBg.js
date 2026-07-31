import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const images = [
  { src: 'C:/Users/ABC/.gemini/antigravity-ide/brain/04163923-08f5-404d-8469-3bd4d12c92cd/football_jersey_1785474918370.png', dest: 'hero_football.png' },
  { src: 'C:/Users/ABC/.gemini/antigravity-ide/brain/04163923-08f5-404d-8469-3bd4d12c92cd/basketball_jersey_1785474931157.png', dest: 'hero_basketball.png' },
  { src: 'C:/Users/ABC/.gemini/antigravity-ide/brain/04163923-08f5-404d-8469-3bd4d12c92cd/wrestling_singlet_1785474943077.png', dest: 'hero_wrestling.png' },
  { src: 'C:/Users/ABC/.gemini/antigravity-ide/brain/04163923-08f5-404d-8469-3bd4d12c92cd/cricket_jersey_1785474954945.png', dest: 'hero_cricket.png' },
  { src: 'C:/Users/ABC/.gemini/antigravity-ide/brain/04163923-08f5-404d-8469-3bd4d12c92cd/running_shoe_1785474967429.png', dest: 'hero_running.png' },
  { src: 'C:/Users/ABC/.gemini/antigravity-ide/brain/04163923-08f5-404d-8469-3bd4d12c92cd/gym_hoodie_1785474978808.png', dest: 'hero_gym.png' }
];

const destDir = 'C:/Users/ABC/Downloads/dashbaord/eaySports/zarko/zarkowear/public/images';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

async function removeBackground(srcPath, destPath) {
  console.log(`Processing ${path.basename(srcPath)}...`);
  try {
    const image = sharp(srcPath);
    const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
    
    // Create new buffer with 4 channels (RGBA)
    const outBuffer = Buffer.alloc(info.width * info.height * 4);
    const channelsIn = info.channels;
    
    for (let i = 0; i < info.width * info.height; i++) {
      const idxIn = i * channelsIn;
      const idxOut = i * 4;
      
      const r = data[idxIn];
      const g = data[idxIn + 1];
      const b = data[idxIn + 2];
      
      // If color is very close to white, make it transparent
      if (r > 240 && g > 240 && b > 240) {
        outBuffer[idxOut] = 0;
        outBuffer[idxOut + 1] = 0;
        outBuffer[idxOut + 2] = 0;
        outBuffer[idxOut + 3] = 0;
      } else {
        outBuffer[idxOut] = r;
        outBuffer[idxOut + 1] = g;
        outBuffer[idxOut + 2] = b;
        outBuffer[idxOut + 3] = 255;
      }
    }
    
    await sharp(outBuffer, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4
      }
    })
    .png()
    .toFile(destPath);
    
    console.log(`Saved transparent image to ${destPath}`);
  } catch (error) {
    console.error(`Failed to process ${srcPath}:`, error);
  }
}

async function run() {
  for (const img of images) {
    const targetPath = path.join(destDir, img.dest);
    await removeBackground(img.src, targetPath);
  }
}

run();
