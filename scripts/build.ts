// import path from "path";
// import fs from "fs-extra";
// import { Octokit } from "octokit";

// const octokit = new Octokit({
//   auth: "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",
// });

// export async function build(type?: "answers" | "redirects") {
//   const quizes = await getQuestions();

//   // if build command is called with answers argument, then load answers
//   if (type === "answers") {
//     await loadAnswers(quizes);

//     return;
//   }

//   await setupRedirects(quizes);
// }

// async function loadAnswers(quizes: Awaited<ReturnType<typeof loadQuizes>>) {
//   for (const quiz of quizes) {
//     const answersFolderPath = path.join(ROOT_PATH, "questions", quiz.path, "answers");

//     const answers = await fetchAnswers(quiz.no);

//     if (answers.length == 0) return;

//     await fs.ensureDir(answersFolderPath);

//     for (const answer of answers) {
//       const answerFilePath = path.join(answersFolderPath, `${answer.number}.md`);

//       if (answer.body) {
//         const metaInfo = {
//           title: answer.title,
//           author: answer.user?.login,
//           author_url: answer.user?.html_url,
//           author_avatar: answer.user?.avatar_url,
//           framework: answer.labels
//             // @ts-expect-error type mismatch
//             .map((label) => (SUPPORTED_TEMPLATES.includes(label.name) ? label.name : undefined))
//             .filter(Boolean)[0],
//         };

//         const body =
//           `<!--info-header-start-->` +
//           "\n" +
//           `${JSON.stringify(metaInfo)}` +
//           "\n" +
//           `<!--info-header-end-->` +
//           "\n\n" +
//           answer.body;

//         await fs.writeFile(answerFilePath, body);
//       }
//     }
//   }
// }

// async function fetchAnswers(no: number) {
//   const { data } = await octokit.request("GET /repos/{owner}/{repo}/issues", {
//     owner: "jsartisan",
//     repo: "frontend-challenges",
//     labels: `${no},answer`,
//     state: "all",
//   });

//   return data;
// }

// /**
//  * rewrite next.js config to add redirects for each quiz
//  *
//  * @param quizes
//  */
// async function setupRedirects(quizes: Awaited<ReturnType<typeof loadQuizes>>) {
//   const redirects: any[] = [];

//   // TODO: redirect homepage to github repo
//   SUPPORTED_LOCALES.filter((locale) => locale !== DEFAULT_LOCALE).forEach((locale) => {
//     redirects.push([`/${locale}`, `${REPO}/blob/main/README.${locale}.md`, 302]);
//   });

//   for (const quiz of quizes) {
//     redirects.push({
//       source: `/${quiz.no}/solutions`,
//       destination: toSolutionsFull(quiz.no),
//       permanent: true,
//     });
//   }

//   // rewrite next.js config in website package in the workspace
//   const websiteFolderPath = path.join(ROOT_PATH, "packages", "website");
//   const nextConfigPath = path.join(websiteFolderPath, "next.config.js");

//   const nextConfig = await fs.readFile(nextConfigPath, "utf-8");
//   const nextConfigLines = nextConfig.split("\n");
//   const startIdx = nextConfigLines.findIndex((line) => line.includes("redirects: async () => ["));
//   const endIdx = nextConfigLines.findIndex((line) => line.includes("]"));

//   const newNextConfig = [
//     ...nextConfigLines.slice(0, startIdx + 1),
//     ...redirects.map((i) => `    ${JSON.stringify(i)},`),
//     ...nextConfigLines.slice(endIdx),
//   ].join("\n");

//   await fs.writeFile(nextConfigPath, newNextConfig);
// }

// build(process.argv.slice(2)[0] as any);
