// Edit a challenge's CSS, see the live preview change, and see the edit survive a reload.
const { replaceEditorText, waitForPreview } = require("./_editor.cjs");

const RED = "rgb(255, 0, 0)";
const isRed = (body) => getComputedStyle(body).backgroundColor === "rgb(255, 0, 0)";

module.exports = async ({ page, base, step, expect }) => {
  await page.goto(`${base}/challenges/1-rtl-icon`);
  await page.getByRole("heading", { name: "#1 Icon and RTL" }).waitFor();
  await waitForPreview(page, (body) => body.innerText.includes("Home"));
  await step("challenge-loaded", "description, editor and preview render");

  await page.getByText("styles.css", { exact: true }).click();
  await replaceEditorText(page, `body { background: ${RED}; }`);
  await waitForPreview(page, isRed);
  await step("preview-updated", "preview body turned red after the CSS edit");

  const saved = await page.evaluate(() => localStorage.getItem("fc:/challenges/1-rtl-icon-vanilla"));
  expect(saved && saved.includes(RED), `localStorage holds the edit (got ${saved})`);

  await page.reload();
  await page.getByText("styles.css", { exact: true }).click();
  await page.locator(".monaco-editor .view-lines", { hasText: "background" }).first().waitFor();
  await waitForPreview(page, isRed);
  await step("edit-persisted", "after reload the editor and preview still show the edit");
};
