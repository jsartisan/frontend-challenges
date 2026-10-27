// Narrow the challenge list by text search and by type.
module.exports = async ({ page, base, step, expect }) => {
  await page.goto(`${base}/challenges`);
  const links = page.locator('main a[href^="/challenges/"]');
  await links.first().waitFor();
  const total = await links.count();
  await step("all-challenges", `${total} challenge links`);

  await page.getByPlaceholder("Search").fill("debounce");
  await page.waitForFunction(
    (before) => document.querySelectorAll('main a[href^="/challenges/"]').length < before,
    total,
  );
  const titles = await links.allInnerTexts();
  const named = titles.map((t) => t.trim()).filter(Boolean);
  expect(named.length > 0, "search for debounce finds something");
  expect(named.every((t) => /debounce/i.test(t)), `every result mentions debounce: ${named.join(" | ")}`);
  await step("search-debounce", named.join(" | "));

  await page.getByPlaceholder("Search").fill("");
  await page.getByRole("button", { name: "Quiz" }).click();
  await page.waitForURL(/type=quiz/);
  const quizCount = await links.count();
  expect(quizCount > 0 && quizCount < total, `quiz filter narrows the list (${quizCount} of ${total})`);
  await step("type-quiz", `${quizCount} quiz links, url ${page.url()}`);
};
