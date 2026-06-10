// Génère src/app/favicon.ico (ICO contenant un PNG 32×32) depuis src/app/icon.svg.
// Usage : node scripts/generate-favicon.mjs
import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";

const svg = await readFile(new URL("../src/app/icon.svg", import.meta.url));
const png = await sharp(svg).resize(32, 32).png().toBuffer();

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // réservé
header.writeUInt16LE(1, 2); // type ICO
header.writeUInt16LE(1, 4); // 1 image

const entry = Buffer.alloc(16);
entry.writeUInt8(32, 0); // largeur
entry.writeUInt8(32, 1); // hauteur
entry.writeUInt8(0, 2); // palette
entry.writeUInt8(0, 3); // réservé
entry.writeUInt16LE(1, 4); // plans
entry.writeUInt16LE(32, 6); // bits/pixel
entry.writeUInt32LE(png.length, 8); // taille des données
entry.writeUInt32LE(22, 12); // offset

await writeFile(
  new URL("../src/app/favicon.ico", import.meta.url),
  Buffer.concat([header, entry, png])
);
console.log("favicon.ico généré ✓");
