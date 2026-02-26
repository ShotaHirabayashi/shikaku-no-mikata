import fs from "fs";

const API_KEY = process.env.GOOGLE_API_KEY;
const MODEL = "gemini-3-pro-image-preview";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

const prompt = `Create an abstract, atmospheric background image for a website hero section. Soft watercolor-style washes and gentle gradients blending warm teal (#0d9488), soft amber (#f5d08a), and warm cream/ivory tones. Include subtle organic textures like paper grain, soft bokeh light spots, and delicate flowing shapes. Very soft, muted, and diffused — this will have white text overlaid on it, so keep it low-contrast and airy. No objects, no icons, no text, no people. Think of it as a premium, editorial mood backdrop. Wide panoramic format, 1400x600 pixels.`;

async function main() {
  console.log("Generating hero background...");
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseModalities: ["TEXT", "IMAGE"] },
    }),
  });

  if (!res.ok) {
    console.error("Error:", res.status, await res.text());
    return;
  }

  const data = await res.json();
  const parts = data?.candidates?.[0]?.content?.parts ?? [];
  for (const part of parts) {
    if (part.inlineData) {
      const buf = Buffer.from(part.inlineData.data, "base64");
      fs.writeFileSync("public/images/hero-bg.png", buf);
      console.log(`Saved hero-bg.png (${(buf.length / 1024).toFixed(0)} KB)`);
      return;
    }
  }
  console.log("No image in response");
}

main();
