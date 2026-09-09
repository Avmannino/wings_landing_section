// Regenerates the web-optimized assets in public/assets/ from the
// full-size originals in raw-assets/. Run with: npm run optimize:images
//
// raw-assets/ holds the source files (large camera exports, full-res logos)
// and is not shipped. Everything the app references lives in public/assets/.

import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const RAW = join(root, "raw-assets");
const OUT = join(root, "public", "assets");

// Fullscreen backgrounds: sit behind a gradient wash + vignette, so they
// tolerate aggressive compression. 1920w covers all common viewports.
const backgrounds = ["background-01", "background-02", "background-03"];

// Photographic banners — keep a JPG fallback, add a WebP. ~1000w is plenty
// for a strip that renders at most ~560px CSS wide.
const banners = [{ name: "livebarn-banner", width: 1000 }];

// Transparent art — keep a PNG for compatibility, add a much smaller WebP.
// `palette` quantises to <=256 colours: safe for flat icons, skipped for the
// logo where it could band.
const pngs = [
  { name: "wings-logo", width: 720, palette: false },
  { name: "livebarn", width: 160, palette: true },
  { name: "instagram", width: 160, palette: true },
  { name: "facebook", width: 160, palette: true },
  { name: "catchcorner", width: 160, palette: true },
];

async function run() {
  await mkdir(OUT, { recursive: true });

  for (const name of backgrounds) {
    const src = sharp(join(RAW, `${name}.jpg`)).resize(1920, null, {
      withoutEnlargement: true,
    });

    await src
      .clone()
      .jpeg({ quality: 78, mozjpeg: true })
      .toFile(join(OUT, `${name}.jpg`));

    await src
      .clone()
      .webp({ quality: 70 })
      .toFile(join(OUT, `${name}.webp`));

    console.log(`✓ ${name} → .jpg + .webp @ 1920w`);
  }

  for (const { name, width } of banners) {
    const src = sharp(join(RAW, `${name}.jpg`)).resize(width, null, {
      withoutEnlargement: true,
    });

    await src
      .clone()
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(join(OUT, `${name}.jpg`));

    await src
      .clone()
      .webp({ quality: 78 })
      .toFile(join(OUT, `${name}.webp`));

    console.log(`✓ ${name} → .jpg + .webp @ ${width}w`);
  }

  for (const { name, width, palette } of pngs) {
    const src = sharp(join(RAW, `${name}.png`)).resize(width, null, {
      withoutEnlargement: true,
    });

    await src
      .clone()
      .png({ compressionLevel: 9, palette })
      .toFile(join(OUT, `${name}.png`));

    await src
      .clone()
      .webp({ quality: 82 })
      .toFile(join(OUT, `${name}.webp`));

    console.log(`✓ ${name} → .png + .webp @ ${width}w`);
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
