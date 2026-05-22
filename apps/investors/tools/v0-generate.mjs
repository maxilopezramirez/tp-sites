import { createClient } from "v0-sdk";
import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { writeFileSync, readFileSync, mkdirSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "../.env") });

const v0 = createClient({ apiKey: process.env.V0_API_KEY });
const prompt = process.argv[2];
const outputDir = process.argv[3] || resolve(__dirname, "../v0-output");

if (!prompt) {
  console.error("Usage: node tools/v0-generate.mjs <prompt> [output-dir]");
  process.exit(1);
}

const systemPrompt = readFileSync(
  resolve(__dirname, "v0-system-prompts/ticketplus-investors.md"),
  "utf-8"
);
const designTokens = readFileSync(
  resolve(__dirname, "../src/styles/ir.css"),
  "utf-8"
);

const fullSystem = `${systemPrompt}\n---\n## ir.css (REFERENCE — these are the ONLY CSS variables and utility classes available)\n\`\`\`css\n${designTokens}\n\`\`\``;

console.log("Sending to v0...");
try {
  const chat = await v0.chats.create({
    message: prompt,
    system: fullSystem,
    chatPrivacy: "private",
    modelConfiguration: { modelId: "v0-pro" },
  });
  console.log("Chat ID:", chat.id);
  if (chat.webUrl) console.log("Preview:", chat.webUrl);
  if (chat.latestVersion?.files?.length) {
    mkdirSync(outputDir, { recursive: true });
    for (const file of chat.latestVersion.files) {
      const filePath = resolve(outputDir, file.name);
      mkdirSync(dirname(filePath), { recursive: true });
      writeFileSync(filePath, file.content);
      console.log(`  - ${file.name}`);
    }
    console.log(`Saved to: ${outputDir}`);
  }
} catch (err) {
  console.error("Error:", err.message || err);
  process.exit(1);
}
