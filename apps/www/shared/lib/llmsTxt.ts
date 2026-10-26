import { REPO } from "~/shared/config/paths";
import { DEFAULT_LOCALE } from "~/shared/config/locale";
import { SITE_NAME, SITE_DESCRIPTION } from "~/shared/lib/structuredData";
import { absoluteUrl, toDescription } from "~/shared/lib/seo";
import { CATEGORIES } from "~/entities/category";
import { getRoadmaps } from "~/entities/roadmap/api";
import { getAllBlogs } from "~/entities/blog/api/getAllBlogs";
import { getChallenges } from "~/entities/challenge/api/getChallenges";
import { CATEGORY_METADATA } from "~/entities/category/config/metadata";
import { filterChallengesByCategory } from "~/entities/category/api/getChallengesByCategory";

const TYPE_LABEL: Record<string, string> = {
  question: "coding challenge",
  quiz: "quiz",
  theory: "theory question",
};

const oneLine = (text: unknown) =>
  String(text ?? "")
    .replace(/\s+/g, " ")
    .trim();
const linkText = (text: unknown) => oneLine(text).replace(/([[\]])/g, "\\$1");
const plural = (count: number, word: string, many = `${word}s`) => `${count} ${count === 1 ? word : many}`;
const firstSentence = (text: string) => text.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? text;

/**
 * Builds /llms.txt from the same sources as the sitemap (challenges/*, roadmaps/*, content/blog), so the index
 * cannot list a page that does not exist and new content shows up on the next build.
 * Descriptions only restate fields from those sources.
 */
export async function buildLlmsTxt(): Promise<string> {
  const challenges = (await getChallenges()).sort((a, b) => a.no - b.no);
  const roadmaps = await getRoadmaps();
  const blogs = getAllBlogs();

  const byType = (type: string) => challenges.filter((challenge) => challenge.type === type).length;
  const lines: string[] = [];

  lines.push(`# ${SITE_NAME}`, "");
  lines.push(
    `> ${SITE_DESCRIPTION} The site has ${plural(challenges.length, "challenge")} across JavaScript, CSS and React, plus curated roadmaps that order challenges into study plans.`,
    "",
  );
  lines.push(
    `- Challenge types: ${plural(byType("question"), "coding challenge")}, ${plural(byType("quiz"), "quiz", "quizzes")} and ${plural(byType("theory"), "theory question")}. Difficulty is one of easy, medium, hard or extreme.`,
    "- Every challenge has its own page at `/challenges/<number>-<slug>` with the full problem statement, difficulty and tags in the page text. Coding challenges also include an in-browser editor.",
    "",
  );

  lines.push("## Start here", "");
  lines.push(
    `- [All challenges](${absoluteUrl("/challenges")}): Browse all ${challenges.length} challenges and filter by category, difficulty and type.`,
    `- [Roadmaps](${absoluteUrl("/roadmaps")}): Curated study plans that group challenges by topic.`,
    `- [Blog](${absoluteUrl("/blog")}): Articles about the project.`,
    "",
  );

  lines.push("## Categories", "");
  for (const category of CATEGORIES) {
    const count = filterChallengesByCategory(challenges, category).length;

    if (!count) continue;

    const { title, description } = CATEGORY_METADATA[category];

    lines.push(
      `- [${title} challenges](${absoluteUrl(`/categories/${category}`)}): ${plural(count, "challenge")}. ${oneLine(description)}`,
    );
  }
  lines.push("");

  lines.push("## Roadmaps", "");
  for (const roadmap of roadmaps) {
    const count = new Set(roadmap.topics.flatMap((topic) => topic.challenges.map((challenge) => challenge.path))).size;
    const description = oneLine(roadmap.info?.[DEFAULT_LOCALE]?.description);

    lines.push(
      `- [${linkText(roadmap.title)} roadmap](${absoluteUrl(`/roadmaps/${roadmap.path}`)}): ${plural(count, "challenge")} in ${plural(roadmap.topics.length, "topic")}.${description ? ` ${toDescription(firstSentence(description), 300)}` : ""}`,
    );
  }
  lines.push("");

  if (blogs.length) {
    lines.push("## Blog", "");
    for (const blog of blogs) {
      lines.push(
        `- [${linkText(blog.title)}](${absoluteUrl(`/${blog.path}`)})${blog.excerpt ? `: ${toDescription(oneLine(blog.excerpt), 300)}` : ""}`,
      );
    }
    lines.push("");
  }

  lines.push("## Agent guidance", "");
  lines.push(
    "- For the wording, difficulty, tags and author of a specific challenge, use that challenge's page rather than a summary.",
    "- For the order in which to study topics, use a roadmap page. Roadmaps list challenges only; this site does not state how long a roadmap takes or what it guarantees.",
    "- Do not infer hiring outcomes, company-specific interview content or pricing from this site; none of that is listed here.",
    "",
  );

  lines.push("## Optional", "");
  lines.push(
    `- [Sitemap](${absoluteUrl("/sitemap.xml")}): Machine-readable list of all indexable pages.`,
    `- [Source code and contribution guide on GitHub](${REPO}): The open source repository; challenges live in the \`challenges\` folder.`,
  );
  for (const challenge of challenges) {
    const info = challenge.info?.[DEFAULT_LOCALE];
    const tags = (info?.tags ?? []).filter(Boolean).join(", ");
    const kind = `${challenge.difficulty} ${TYPE_LABEL[challenge.type] ?? "challenge"}`;

    lines.push(
      `- [#${challenge.no} ${linkText(info?.title ?? challenge.path)}](${absoluteUrl(`/challenges/${challenge.path}`)}): ${kind}${tags ? `. Tags: ${tags}` : ""}.`,
    );
  }
  lines.push("");

  return lines.join("\n");
}
