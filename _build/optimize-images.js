#!/usr/bin/env node
// Resizes and recompresses JPEG photos in /assets in place.
// Usage (from _build/):  npm run images
//
// - Long edge capped at 1920px for hero images, 1600px for everything else
//   (enough for full-screen gallery view on a laptop).
// - mozjpeg quality 78, progressive, metadata stripped (EXIF rotation is applied first).
// - Files already small and within the size limit are skipped, so re-running is safe.
// - A file is only overwritten if the result is at least 10% smaller.

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ASSETS = path.resolve(__dirname, '..', 'assets');
const SKIP_BELOW_BYTES = 250 * 1024;

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);
}

async function main() {
  let before = 0, after = 0, changed = 0;
  for (const file of walk(ASSETS).filter((f) => /\.jpe?g$/i.test(f))) {
    const input = fs.readFileSync(file);
    const meta = await sharp(input).metadata();
    const maxEdge = /hero/i.test(path.basename(file)) ? 1920 : 1600;
    const longEdge = Math.max(meta.width, meta.height);
    before += input.length;
    if (input.length < SKIP_BELOW_BYTES && longEdge <= maxEdge) { after += input.length; continue; }

    const output = await sharp(input)
      .rotate()
      .resize({ width: maxEdge, height: maxEdge, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 78, mozjpeg: true, progressive: true })
      .toBuffer();

    if (output.length < input.length * 0.9) {
      fs.writeFileSync(file, output);
      after += output.length;
      changed++;
      console.log(`${path.relative(ASSETS, file)}: ${(input.length / 1024).toFixed(0)} KB -> ${(output.length / 1024).toFixed(0)} KB`);
    } else {
      after += input.length;
    }
  }
  console.log(`\n${changed} files optimized. Total ${(before / 1048576).toFixed(1)} MB -> ${(after / 1048576).toFixed(1)} MB`);
}

main().catch((e) => { console.error(e); process.exit(1); });
