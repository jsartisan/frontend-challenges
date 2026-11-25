// The header Feedback button links to a new GitHub issue with the feedback template and label.
module.exports = async ({ page, base, step, expect }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto(`${base}/`);
  const link = page.getByRole("link", { name: "Send feedback" });
  await link.waitFor();
  const href = await link.getAttribute("href");
  const url = new URL(href);
  expect(url.pathname === "/jsartisan/frontend-challenges/issues/new", `issue path (${href})`);
  expect(url.searchParams.get("template") === "feedback.md", `template param (${href})`);
  expect(url.searchParams.get("labels") === "feedback", `labels param (${href})`);
  expect((await link.getAttribute("target")) === "_blank", "opens in a new tab");
  await step("header-light", href);

  await page.emulateMedia({ colorScheme: "dark" });
  await page.waitForTimeout(300);
  await step("header-dark");

  await page.setViewportSize({ width: 390, height: 800 });
  await page.waitForTimeout(300);
  expect(await link.isVisible(), "feedback button visible on mobile");
  await step("header-mobile-dark", "icon-only below sm");

  await page.goto(`${base}/play`);
  await page.getByRole("link", { name: "Send feedback" }).waitFor();
  await step("editor-layout-header", "button also present on the editor layout");
};
