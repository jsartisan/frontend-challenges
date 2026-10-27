// Open the header search (button and keyboard), pick a challenge, land on it.
module.exports = async ({ page, base, step, expect }) => {
  await page.goto(`${base}/`);
  await page.getByRole("button", { name: /Search/ }).first().click();
  const input = page.getByPlaceholder("Search Challenges...");
  await input.waitFor();
  await step("search-open-button");

  await input.fill("Curry with Placeholder");
  await page.getByRole("menuitem", { name: /Curry with Placeholder/ }).first().waitFor();
  await step("search-results", "typed Curry with Placeholder");
  await page.keyboard.press("Enter");
  await page.waitForURL(/\/challenges\/455-curry-with-placeholder/);
  await page.getByRole("heading", { name: /Curry with Placeholder/ }).waitFor();
  await step("landed-on-challenge");

  // Use the shortcut from the home page: on a challenge page Monaco can own the keys.
  await page.goto(`${base}/`);
  // Lowercase k: the app matches e.key === "k", and "+K" sends "K".
  // The shortcut listener attaches after hydration, which can trail the load
  // event in dev. Retry the keypress until the dialog shows, never toggle it shut.
  for (let i = 0; i < 20 && !(await input.isVisible()); i++) {
    await page.keyboard.press("ControlOrMeta+k");
    await input.waitFor({ timeout: 1000 }).catch(() => {});
  }
  await input.waitFor();
  await input.fill("zzzz-no-such-challenge");
  await page.getByText("No results found.").waitFor();
  await step("search-open-keyboard-empty", "Ctrl/Cmd+K opens search; nonsense query shows the empty state");
};
