import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, '../public/images');
const MANIFEST_PATH = path.join(__dirname, '../media-manifest.json');

async function getManifest() {
  try {
    const data = await fs.readFile(MANIFEST_PATH, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return {};
  }
}

async function saveManifest(manifest) {
  await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
}

async function getFiles(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  }));
  return Array.prototype.concat(...files);
}

async function optimize() {
  const force = process.argv.includes('--force');
  const files = await getFiles(PUBLIC_DIR);
  const manifest = await getManifest();
  const newManifest = { ...manifest };

  for (const file of files) {
    const relativePath = path.relative(PUBLIC_DIR, file);
    const stats = await fs.stat(file);
    const mtime = stats.mtimeMs;

    if (!force && manifest[relativePath] === mtime) {
      continue;
    }

    const ext = path.extname(file).toLowerCase();
    
    if (['.webp', '.jpg', '.jpeg', '.png'].includes(ext)) {
      console.log(`Optimizing image: ${relativePath}`);
      const buffer = await fs.readFile(file);
      let sharpInstance = sharp(buffer).rotate();

      // Auto-resize large images to a max width of 1200px
      const metadata = await sharpInstance.metadata();
      if (metadata.width > 1200) {
        sharpInstance = sharpInstance.resize(1200, null, { withoutEnlargement: true });
      }

      if (ext === '.webp') {
        sharpInstance = sharpInstance.webp({ quality: 80, effort: 6 });
      } else if (ext === '.png') {
        sharpInstance = sharpInstance.png({ compressionLevel: 9, palette: true, quality: 80 });
      } else {
        sharpInstance = sharpInstance.jpeg({ quality: 80, progressive: false, mozjpeg: false });
      }

      await sharpInstance.toFile(file + '.tmp');
      await fs.rename(file + '.tmp', file);
      
      const newStats = await fs.stat(file);
      newManifest[relativePath] = newStats.mtimeMs;
      
      const saved = ((stats.size - newStats.size) / 1024).toFixed(2);
      console.log(`  Saved ${saved} KB`);
    } 
    else if (['.mp4', '.mov'].includes(ext)) {
      console.log(`Optimizing video: ${relativePath}`);
      const output = file + '.tmp.mp4';
      
      try {
        execSync(`ffmpeg -i "${file}" -vcodec libx264 -crf 28 -preset fast -acodec aac -b:a 128k "${output}" -y -loglevel error`);
        await fs.rename(output, file);
        
        const newStats = await fs.stat(file);
        newManifest[relativePath] = newStats.mtimeMs;
        
        const saved = ((stats.size - newStats.size) / (1024 * 1024)).toFixed(2);
        console.log(`  Saved ${saved} MB`);
      } catch (e) {
        console.error(`  Error optimizing video ${relativePath}:`, e.message);
      }
    }
  }

  await saveManifest(newManifest);
  console.log('Media optimization complete.');
}

optimize().catch(console.error);
