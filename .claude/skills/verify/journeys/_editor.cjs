// Shared Monaco and Sandpack helpers for journeys. Not a journey itself.

// Replace the active Monaco file's whole content. Click the rendered lines:
// Monaco's hidden textarea sits under them and rejects direct clicks.
async function replaceEditorText(page, text) {
  await page.locator(".monaco-editor .view-lines").first().click();
  await page.keyboard.press("ControlOrMeta+A");
  await page.keyboard.press("Delete");
  // insertText skips Monaco's auto-closing of brackets and quotes.
  await page.keyboard.insertText(text);
}

// Poll the Sandpack preview until fn(body) returns truthy, or fail after timeoutMs.
async function waitForPreview(page, fn, timeoutMs = 30000) {
  await page.waitForSelector('iframe[title="Sandpack Preview"]', { timeout: 60000 });
  const body = page.frameLocator('iframe[title="Sandpack Preview"]').locator("body");
  const deadline = Date.now() + timeoutMs;
  let last;
  while (Date.now() < deadline) {
    last = await body.evaluate(fn).catch((e) => `not ready: ${e.message.split("\n")[0]}`);
    if (last === true) return;
    await page.waitForTimeout(500);
  }
  throw new Error(`preview never matched; last value: ${last}`);
}

module.exports = { replaceEditorText, waitForPreview };
