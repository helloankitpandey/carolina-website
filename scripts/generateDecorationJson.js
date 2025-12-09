// scripts/generateDecorationJson.js
const fs = require("fs");
const path = require("path");

const publicDir = path.join(__dirname, "..", "public");
const decoDir = path.join(publicDir, "decoration");
const outFile = path.join(publicDir, "decoration-images.json");

if (!fs.existsSync(decoDir)) {
  console.error("Folder public/decoration not found.");
  process.exit(1);
}

const files = fs.readdirSync(decoDir)
  .filter((f) => /\.(jpe?g|png|webp|gif|avif)$/i.test(f))
  .sort(); // optional sorting

const items = files.map((fname, i) => ({
  id: `decoration-${i + 1}`,
  caption: fname.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
  url: `/decoration/${fname}`,
}));

fs.writeFileSync(outFile, JSON.stringify(items, null, 2));
console.log(`Wrote ${items.length} items to ${path.relative(process.cwd(), outFile)}`);
