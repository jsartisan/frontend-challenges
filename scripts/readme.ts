import path from "path";
import fs from "fs-extra";

import {
  toBadge,
  quizToBadge,
  insertInfoReadme,
  getFileNameByLocale,
  toDifficultyPlainText,
  toDifficultyBadgeInverted,
} from "@/utils";
import { Question } from "@/types";
import { DIFFICULTY_RANK, ROOT_PATH, SUPPORTED_LOCALES } from "@/constants";
import { getAllTags, getQuestions, getQuizesByTag } from "@/db/question";

/**
 * update the root readme
 *
 * @param quizes
 */
async function updateIndexREADME(quizes: Question[]) {
  // update index README
  for (const locale of SUPPORTED_LOCALES) {
    const filepath = path.resolve(__dirname, "..", getFileNameByLocale("README", locale, "md"));

    let challengesREADME = "";
    let prev = "";

    // difficulty
    const quizesByDifficulty = [...quizes].sort(
      (a, b) => DIFFICULTY_RANK.indexOf(a.difficulty) - DIFFICULTY_RANK.indexOf(b.difficulty),
    );

    for (const quiz of quizesByDifficulty) {
      if (prev !== quiz.difficulty)
        challengesREADME += `${prev ? "<br><br>" : ""}${toDifficultyBadgeInverted(
          quiz.difficulty,
          locale,
          quizesByDifficulty.filter((q) => q.difficulty === quiz.difficulty).length,
        )}<br>`;

      challengesREADME += quizToBadge(quiz, locale);

      prev = quiz.difficulty;
    }

    // by tags
    challengesREADME += "<br><details><summary>By Tags</summary><br><table><tbody>";
    const tags = getAllTags(quizes, locale);
    for (const tag of tags) {
      challengesREADME += `<tr><td>${toBadge("", `#${tag}`, "999")}</td><td>`;
      getQuizesByTag(quizesByDifficulty, locale, tag).forEach((quiz) => {
        challengesREADME += quizToBadge(quiz, locale);
      });
      challengesREADME += "</td></tr>";
    }
    challengesREADME +=
      "<tr><td><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</code></td><td></td></tr>";
    challengesREADME += "</tbody></table></details>";

    // by plain text
    prev = "";
    challengesREADME += "<br><details><summary>By Plain Text</summary><br>";
    for (const quiz of quizesByDifficulty) {
      if (prev !== quiz.difficulty)
        challengesREADME += `${prev ? "</ul>" : ""}<h3>${toDifficultyPlainText(
          quiz.difficulty,
          locale,
          quizesByDifficulty.filter((q) => q.difficulty === quiz.difficulty).length,
        )}</h3><ul>`;
      challengesREADME += `<li>${quizToBadge(quiz, locale, false, false)}</li>`;
      prev = quiz.difficulty;
    }
    challengesREADME += "</ul></details><br>";

    let readme = await fs.readFile(filepath, "utf-8");
    readme = readme.replace(
      /<!--challenges-start-->[\s\S]*<!--challenges-end-->/m,
      `<!--challenges-start-->\n${challengesREADME}\n<!--challenges-end-->`,
    );

    await fs.writeFile(filepath, readme, "utf-8");
  }
}

/**
 * update question readme
 *
 * @param quizes
 */
async function updateQuestionsREADME(quizes: Question[]) {
  const questionsDir = path.join(ROOT_PATH, "questions");

  // update each questions' readme
  for (const quiz of quizes) {
    for (const locale of SUPPORTED_LOCALES) {
      await insertInfoReadme(
        path.join(questionsDir, quiz.path, getFileNameByLocale("README", locale, "md")),
        quiz,
        locale,
        quizes,
      );
    }
  }
}

export async function updateREADMEs(type?: "quiz" | "index") {
  const quizes = await getQuestions();

  quizes.sort((a, b) => a.no - b.no);

  if (type === "quiz") {
    return await updateQuestionsREADME(quizes);
  }

  if (type === "index") {
    return await updateIndexREADME(quizes);
  }

  await Promise.all([updateIndexREADME(quizes), updateQuestionsREADME(quizes)]);
}

updateREADMEs(process.argv.slice(2)[0] as any);
