import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = "public/img/hero/hero-gallinas.jpg"; // 995x557 original
const OUT = "public/img/hero";
const BASE = path.join(OUT, "hero-gallinas");

// Objetivo: ~26–30 KB para 768 y ~35–45 KB para 995
const targets = [
  { w: 768, avifQ: 32, webpQ: 78, jpgQ: 72 },
  { w: 995, avifQ: 34, webpQ: 80, jpgQ: 75 },
];

if (!fs.existsSync(SRC)) {
  console.error("No existe:", SRC);
  process.exit(1);
}
fs.mkdirSync(OUT, { recursive: true });

for (const t of targets) {
  const img = sharp(SRC, { limitInputPixels: false })
    .rotate()
    .resize({
      width: t.w,
      withoutEnlargement: true,
      fit: "cover",
      kernel: sharp.kernel.lanczos3,
      fastShrinkOnLoad: true,
    })
    .toColorspace("srgb");

  // AVIF más agresivo
  await img
    .clone()
    .avif({ quality: t.avifQ, effort: 6, chromaSubsampling: "4:2:0" })
    .toFile(`${BASE}-${t.w}.avif`);

  // WebP fallback
  await img.clone().webp({ quality: t.webpQ }).toFile(`${BASE}-${t.w}.webp`);

  // JPG fallback liviano (para user agents raros)
  await img
    .clone()
    .jpeg({ quality: t.jpgQ, mozjpeg: true })
    .toFile(`${BASE}-${t.w}.jpg`);

  const s = (p) => (fs.statSync(p).size / 1024).toFixed(1) + " KB";
  console.log(
    `OK ${t.w}px →`,
    s(`${BASE}-${t.w}.avif`),
    s(`${BASE}-${t.w}.webp`),
    s(`${BASE}-${t.w}.jpg`)
  );
}

console.log("Listo ✅");
