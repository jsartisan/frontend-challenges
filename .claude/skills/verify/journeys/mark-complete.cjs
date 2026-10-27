// Mark a challenge complete, see it reflected on the list, then undo it.
module.exports = async ({ page, base, step, expect }) => {
  await page.goto(`${base}/challenges/1-rtl-icon`);
  const button = page.getByRole("button", { name: "Mark as complete" });
  await button.waitFor();
  await step("not-completed");

  await button.click();
  await page.getByRole("button", { name: "Completed" }).waitFor();
  const stored = await page.evaluate(() => localStorage.getItem("fc-completions"));
  expect(JSON.parse(stored || "[]").includes(1), `fc-completions contains 1 (got ${stored})`);
  await step("completed", `fc-completions = ${stored}`);

  await page.goto(`${base}/challenges`);
  await page.getByPlaceholder("Search").fill("Icon and RTL");
  const row = page.locator('[data-completed="true"]', { has: page.getByRole("link", { name: "Icon and RTL" }) });
  await row.first().waitFor();
  await step("list-shows-completed", "the list row for Icon and RTL carries data-completed");

  await page.goto(`${base}/challenges/1-rtl-icon`);
  await page.getByRole("button", { name: "Completed" }).click();
  await page.getByRole("button", { name: "Mark as complete" }).waitFor();
  const after = await page.evaluate(() => localStorage.getItem("fc-completions"));
  expect(!JSON.parse(after || "[]").includes(1), `fc-completions no longer contains 1 (got ${after})`);
  await step("uncompleted", `fc-completions = ${after}`);
};
