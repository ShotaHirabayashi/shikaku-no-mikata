import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "images");
const API_KEY = process.env.GOOGLE_API_KEY;
const MODEL = "gemini-3-pro-image-preview";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

const images = [
  {
    file: "thumb-sample-post.png",
    prompt:
      "A clean, modern flat illustration for a Japanese website about comparing study qualifications. Show abstract comparison cards laid out side by side with rating stars, checklists, and subtle chart elements. Use a warm teal (#0d9488) and amber (#f59e0b) color palette on a soft warm light gray background. Minimalist editorial style, no text, no people, no faces. Aspect ratio 16:10.",
  },
  {
    file: "thumb-seiri-shunou.png",
    prompt:
      "A clean, modern flat illustration about home organization and tidying up for a Japanese website. Show neatly arranged shelves with organized boxes, folded items, and labeled containers. A tidy minimalist room feel. Use warm teal (#0d9488) and amber (#f59e0b) accents on a soft warm light background. Editorial illustration style, no text, no people, no faces. Aspect ratio 16:10.",
  },
  {
    file: "thumb-yakuzen.png",
    prompt:
      "A clean, modern flat illustration about traditional Chinese herbal medicine cooking (yakuzen) for a Japanese website. Show a beautiful ceramic bowl with colorful herbs, spices, ginger, and medicinal ingredients around it. Gentle steam rising. Use warm teal (#0d9488) and amber (#f59e0b) color accents on a soft warm light background. Editorial illustration style, no text, no people, no faces. Aspect ratio 16:10.",
  },
  {
    file: "thumb-color-coordinator.png",
    prompt:
      "A clean, modern flat illustration about color coordination and color theory for a Japanese website. Show paint swatches, a color wheel, Pantone-style color chips fanned out, and gradient samples. Use a variety of harmonious colors with teal (#0d9488) and amber (#f59e0b) as key accents on a soft warm light background. Editorial illustration style, no text, no people, no faces. Aspect ratio 16:10.",
  },
  {
    file: "thumb-web-analyst.png",
    prompt:
      "A clean, modern flat illustration about web analytics and digital marketing for a Japanese website. Show a browser window with analytics dashboard, bar charts, line graphs, pie charts, and data visualization elements. Use warm teal (#0d9488) and amber (#f59e0b) color accents on a soft warm light background. Editorial illustration style, no text, no people, no faces. Aspect ratio 16:10.",
  },
  {
    file: "thumb-fp3.png",
    prompt:
      "A clean, modern flat illustration about financial planning (FP) certification for a Japanese website. Show elements like a calculator, coins stacking up, a simple growth chart, a piggy bank, and financial documents. Use warm teal (#0d9488) and amber (#f59e0b) color accents on a soft warm light background. Editorial illustration style, no text, no people, no faces. Aspect ratio 16:10.",
  },
  {
    file: "thumb-tsushin-kouza.png",
    prompt:
      "A clean, modern flat illustration about comparing online learning courses for a Japanese website. Show a laptop with course content, textbooks stacked, a certificate with a ribbon, and study materials. Use warm teal (#0d9488) and amber (#f59e0b) color accents on a soft warm light background. Editorial illustration style, no text, no people, no faces. Aspect ratio 16:10.",
  },
];

async function generateImage(item) {
  console.log(`Generating: ${item.file}...`);
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: item.prompt }] }],
      generationConfig: { responseModalities: ["TEXT", "IMAGE"] },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(`  Error for ${item.file}: ${res.status} ${err.slice(0, 200)}`);
    return false;
  }

  const data = await res.json();
  const parts = data?.candidates?.[0]?.content?.parts ?? [];

  for (const part of parts) {
    if (part.inlineData) {
      const buf = Buffer.from(part.inlineData.data, "base64");
      const outPath = path.join(OUT_DIR, item.file);
      fs.writeFileSync(outPath, buf);
      console.log(`  Saved: ${outPath} (${(buf.length / 1024).toFixed(0)} KB)`);
      return true;
    }
  }

  console.error(`  No image in response for ${item.file}`);
  return false;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  // 2枚ずつ並列で処理（API rate limit考慮）
  for (let i = 0; i < images.length; i += 2) {
    const batch = images.slice(i, i + 2);
    const results = await Promise.all(batch.map(generateImage));
    const failed = results.filter((r) => !r).length;
    if (failed > 0) console.log(`  ${failed} failed in this batch`);

    // rate limit 回避
    if (i + 2 < images.length) {
      await new Promise((r) => setTimeout(r, 2000));
    }
  }

  console.log("\nDone!");
}

main();
