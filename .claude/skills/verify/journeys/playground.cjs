// Write code in the playground, see it run, and see it survive a reload.
const { replaceEditorText, waitForPreview } = require("./_editor.cjs");

module.exports = async ({ page, base, step, expect }) => {
  await page.goto(`${base}/play`);
  // Wait for the first compile; an edit made before it lands is dropped.
  await waitForPreview(page, (body) => body.innerText.includes("Hello World"));
  await step("playground-loaded", "default vanilla template renders Hello World");

  await page.getByText("index.js", { exact: true }).first().click();
  await replaceEditorText(page, 'import "./styles.css";\ndocument.body.innerHTML = "<h1>Hello from verify</h1>";');
  await waitForPreview(page, (body) => body.innerText.includes("Hello from verify"));
  await step("preview-shows-edit");

  const keys = await page.evaluate(() => Object.keys(localStorage).filter((k) => k.startsWith("fc:/playground")));
  expect(keys.length > 0, `playground saved to localStorage (keys: ${keys})`);

  await page.reload();
  await waitForPreview(page, (body) => body.innerText.includes("Hello from verify"));
  await step("edit-persisted", `localStorage keys ${keys.join(", ")}`);
};
