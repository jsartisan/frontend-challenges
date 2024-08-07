import path from "path";
import fs from "fs-extra";
import c from "picocolors";
import prompts from "prompts";
import { fileURLToPath } from "node:url";
import { getChallenges } from "@frontend-challenges/backend";
import { ROOT_PATH, SUPPORTED_LOCALES } from "@frontend-challenges/shared";
import { copy, createDir, writeFile } from "@frontend-challenges/backend";
import type { Question, SupportedTemplates } from "@frontend-challenges/shared";

// type Snapshot = Record<string, string>;

const renameFiles: Record<string, string | undefined> = {
  _gitignore: ".gitignore",
};

const playgroundPath = path.join(ROOT_PATH, "playground");
// const playgroundCachePath = path.join(ROOT_PATH, ".playgroundcache");

async function generatePlayground() {
  console.log(c.bold(c.cyan("Generating local playground...\n")));

  // get locale and template from user
  const result = await prompts([
    {
      name: "locale",
      type: "select",
      message: "Select language:",
      choices: SUPPORTED_LOCALES.map((i) => ({
        title: i,
        value: i,
      })),
    },
  ]);

  if (!result) return console.log(c.yellow("Skipped."));

  // const { locale } = result as { locale: string };

  copyViteSetup();

  // for each question, generate the folder and copy and override the files from questions template
  const challenges = await getChallenges();
  const questions = challenges.filter((challenge) => challenge?.info?.en?.type !== "quiz") as Question[];

  for (const question of questions) {
    for (const quizTemplate of Object.keys(question.templateFiles)) {
      createTemplate(question, quizTemplate as SupportedTemplates);

      continue;
    }
  }

  return;
}

function copyViteSetup() {
  const viteTemplateDir = path.resolve(fileURLToPath(import.meta.url), "./..", `templates/template-vite`);

  createDir(playgroundPath);

  const files = fs.readdirSync(viteTemplateDir);

  for (const file of files) {
    const targetPath = path.join(playgroundPath, renameFiles[file] ?? file);

    copy(path.join(viteTemplateDir, file), targetPath);
  }
}

function createTemplate(question: Question, template: SupportedTemplates) {
  const templateDir = path.resolve(fileURLToPath(import.meta.url), "./..", `templates/template-${template}`);

  const files = fs.readdirSync(templateDir);

  const questionDir = path.join(
    playgroundPath,
    "questions",
    `${question.path}${template === "vanilla" ? "" : `-${template}`}`,
  );

  // create directory for question
  createDir(questionDir);

  // copy all files from template to question directory we created above
  for (const file of files) {
    const targetPath = path.join(questionDir, renameFiles[file] ?? file);

    copy(path.join(templateDir, file), targetPath);
  }

  // replace the code with quiz's code
  for (const file of Object.keys(question.templateFiles[template])) {
    if (file === "/package.json") continue;

    const targetPath = path.join(questionDir, file);

    writeFile(targetPath, question.templateFiles[template][file].code);
  }

  // add question dependencies to vite 's package.json
  if (Object.keys(question.templateFiles[template]).includes("/package.json")) {
    const vitePackageJson = JSON.parse(fs.readFileSync(path.join(playgroundPath, "package.json"), "utf-8"));
    const questionPackageJson = JSON.parse(question.templateFiles[template]["/package.json"].code);

    vitePackageJson.dependencies = {
      ...vitePackageJson.dependencies,
      ...questionPackageJson.dependencies,
    };

    vitePackageJson.devDependencies = {
      ...vitePackageJson.devDependencies,
      ...questionPackageJson.devDependencies,
    };

    writeFile(path.join(playgroundPath, "package.json"), JSON.stringify(vitePackageJson, null, 2));
  }

  if (template !== "javascript") {
    // append question <li> to index.html to <ul id="quesitons">
    const indexHtmlPath = path.join(playgroundPath, "index.html");
    const indexHtml = fs.readFileSync(indexHtmlPath, "utf-8");
    const questionLi = `<li><a href="/questions/${question.path}${
      template === "vanilla" ? "" : `-${template}`
    }/index.html">${question.info?.en?.title} ${template === "vanilla" ? "" : `-${template}`}</a></li>`;
    const indexHtmlWithQuestion = indexHtml.replace(
      /<ul id="questions">([\s\S]*?)<\/ul>/,
      `<ul id="questions">$1${questionLi}</ul>`,
    );

    writeFile(indexHtmlPath, indexHtmlWithQuestion);
  }
}

generatePlayground();
