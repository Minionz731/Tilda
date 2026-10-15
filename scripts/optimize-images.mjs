// Pulls the property photographs from the live site, applies one gentle uniform grade,
// resizes to a sensible master size and writes a manifest with dimensions and blur
// placeholders. next/image then serves AVIF/WebP at responsive widths from these masters.
//   node scripts/optimize-images.mjs
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ORIGIN = process.env.LIVE_ORIGIN ?? "https://tildabelshaven.com.ng";
const OUT_DIR = "public/images";
const MAX_W = 2400;

const SOURCES = {
  "common-room": ["common-room-1.png", "common-room-2.png", "common-room-3.png", "common-room-4.png", "common-room-5.png"],
  lobby: ["balcony-1.png", "lobby-1.png", "lobby-2.png", "lobby-3.png"],
  outside: ["outside-1.jpg", "outside-2.png", "outside-3.png"],
  reception: ["reception-1.jpg", "reception-2.png", "reception-3.jpg", "reception-4.png"],
  "tilda-classic": [1, 2, 3].map((n) => `tilda-classic-${n}.png`),
  "tilda-deluxe": [1, 2, 3, 4, 5].map((n) => `tilda-deluxe-${n}.png`),
  "tilda-private-suite": [1, 2, 3, 4, 5, 6].map((n) => `tilda-private-suite-${n}.png`),
  "tilda-suite": Array.from({ length: 11 }, (_, i) => `tilda-suite-${i + 1}.png`),
  "tilda-super-deluxe": [1, 2, 3, 4, 5, 6].map((n) => `tilda-super-deluxe-${n}.png`),
};

const manifest = {};
let before = 0;
let after = 0;

for (const [dir, files] of Object.entries(SOURCES)) {
  fs.mkdirSync(path.join(OUT_DIR, dir), { recursive: true });
  await Promise.all(
    files.map(async (file) => {
      const res = await fetch(`${ORIGIN}/images/${dir}/${file}`);
      if (!res.ok) throw new Error(`${res.status} ${dir}/${file}`);
      const input = Buffer.from(await res.arrayBuffer());
      before += input.length;

      const graded = sharp(input)
        .rotate()
        .resize({ width: MAX_W, withoutEnlargement: true })
        .linear(0.97, 0)
        .modulate({ saturation: 0.97 })
        .gamma(2.2, 2.0);

      const name = file.replace(/\.(png|jpe?g)$/i, ".jpg");
      const outPath = path.join(OUT_DIR, dir, name);
      const info = await graded.clone().jpeg({ quality: 84, mozjpeg: true, progressive: true }).toFile(outPath);
      after += info.size;

      const blur = await graded.clone().resize(16).webp({ quality: 40 }).toBuffer();
      // Key is the path the live API uses, so API data maps straight onto local masters.
      manifest[`/images/${dir}/${file}`] = {
        src: `/images/${dir}/${name}`,
        width: info.width,
        height: info.height,
        blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
      };
    }),
  );
}

const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true })));
fs.writeFileSync(
  "src/data/image-manifest.json",
  JSON.stringify(sorted, null, 1) + "\n",
);
console.log(`${Object.keys(sorted).length} images: ${(before / 1e6).toFixed(1)} MB -> ${(after / 1e6).toFixed(1)} MB masters`);
