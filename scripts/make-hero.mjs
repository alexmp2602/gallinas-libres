import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = "public/hero-gallinas.jpg"; // 995x557
const OUT = "public/img/hero";

const sizes = [768, 995]; // no upscaling
const avif = { quality: 45, effort: 4 };
const webp = { quality: 82 };

if (!fs.existsSync(SRC)) {
  console.error("No se encontró:", SRC);
  process.exit(1);
}
fs.mkdirSync(OUT, { recursive: true });

const base = path.join(OUT, "hero-gallinas");

for (const w of sizes) {
  const img = sharp(SRC).resize({ width: w, withoutEnlargement: true });
  await img.clone().toFormat("avif", avif).toFile(`${base}-${w}.avif`);
  await img.clone().toFormat("webp", webp).toFile(`${base}-${w}.webp`);
  // Fallback JPG optimizado (opcional)
  await img
    .clone()
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(`${base}-${w}.jpg`);
  console.log("OK", w);
}
console.log("Listo ✅");
