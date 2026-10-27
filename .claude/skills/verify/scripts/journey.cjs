#!/usr/bin/env node
// Run one browser journey against a launched instance and keep its evidence.
//
// Usage: node .claude/skills/verify/scripts/journey.cjs <journey> [--headed]
//   <journey> is a file name in ../journeys without .cjs, e.g. challenge-editor.
// Base URL comes from VERIFY_PORT (default 8091). Every run gets a fresh browser
// context, so localStorage starts empty.
//
// Evidence goes to <repo>/.verify-artifacts/<journey>/<timestamp>/:
//   NN-<step>.png and NN-<step>.aria.txt for each step, console-errors.txt,
//   and result.json ({journey, ok, steps, error}). stop.sh never deletes it.

const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const name = process.argv[2];
const headed = process.argv.includes("--headed");
const journeysDir = path.join(__dirname, "..", "journeys");
if (!name || !fs.existsSync(path.join(journeysDir, `${name}.cjs`))) {
  const known = fs.readdirSync(journeysDir).filter((f) => !f.startsWith("_")).map((f) => f.replace(/\.cjs$/, ""));
  console.error(`usage: journey.cjs <journey>\njourneys: ${known.join(", ")}`);
  process.exit(2);
}

const root = path.resolve(__dirname, "../../../..");
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const outDir = path.join(root, ".verify-artifacts", name, stamp);
fs.mkdirSync(outDir, { recursive: true });
const base = `http://localhost:${process.env.VERIFY_PORT || 8091}`;

(async () => {
  const browser = await chromium.launch({ headless: !headed });
  const context = await browser.newContext({ viewport: { width: 1400, height: 900 } });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
  page.on("pageerror", (e) => consoleErrors.push(`pageerror: ${e.message}`));

  const steps = [];
  let n = 0;
  // Record a named step: screenshot plus ARIA snapshot of the page as it is now.
  const step = async (label, note = "") => {
    n += 1;
    const prefix = `${String(n).padStart(2, "0")}-${label}`;
    await page.screenshot({ path: path.join(outDir, `${prefix}.png`) });
    const aria = await page.locator("body").ariaSnapshot().catch((e) => `aria snapshot failed: ${e.message}`);
    fs.writeFileSync(path.join(outDir, `${prefix}.aria.txt`), aria);
    steps.push({ step: prefix, url: page.url(), note });
    console.log(`  ✓ ${prefix} ${note}`);
  };
  const expect = (cond, message) => {
    if (!cond) throw new Error(`expectation failed: ${message}`);
  };

  let ok = true;
  let error = null;
  try {
    console.log(`journey ${name} against ${base}`);
    await require(path.join(journeysDir, `${name}.cjs`))({ page, context, base, step, expect });
  } catch (e) {
    ok = false;
    error = String(e.stack || e);
    await page.screenshot({ path: path.join(outDir, "failure.png") }).catch(() => {});
    console.error(`  ✗ ${error}`);
  }
  fs.writeFileSync(path.join(outDir, "console-errors.txt"), consoleErrors.join("\n\n"));
  fs.writeFileSync(path.join(outDir, "result.json"), JSON.stringify({ journey: name, base, ok, steps, error }, null, 2));
  await browser.close();
  console.log(`${ok ? "PASS" : "FAIL"} evidence: ${outDir}`);
  process.exit(ok ? 0 : 1);
})();
