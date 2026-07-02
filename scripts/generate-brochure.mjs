/**
 * Generates the NAPLAN Prep brochure PDF using Playwright.
 *
 * Prerequisites:
 *   1. Start the dev server: npm run dev
 *   2. Run this script: node scripts/generate-brochure.mjs
 *
 * Output: public/brochures/naplan-prep.pdf
 */

import { chromium } from "playwright";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR  = path.join(__dirname, "..", "public", "brochures");
const OUTPUT_PATH = path.join(OUTPUT_DIR, "naplan-prep.pdf");
const URL         = "http://localhost:3000/brochure/naplan-prep";

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log("Launching headless Chrome…");
  const browser = await chromium.launch();
  const page    = await browser.newPage();

  page.on("console", (msg) => console.log("[browser]", msg.text()));
  page.on("pageerror", (err) => console.error("[page error]", err.message));

  console.log(`Navigating to ${URL}…`);
  await page.goto(URL, { waitUntil: "networkidle", timeout: 30_000 });

  // Extra wait to ensure Google Fonts load fully.
  await page.waitForTimeout(2500);

  console.log("Generating PDF…");
  await page.pdf({
    path:            OUTPUT_PATH,
    format:          "A4",
    printBackground: true,
    margin:          { top: "0", right: "0", bottom: "0", left: "0" },
  });

  await browser.close();
  console.log(`✅  PDF written to: ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
