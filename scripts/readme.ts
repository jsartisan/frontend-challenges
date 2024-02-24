import path from "path";
import fs from "fs-extra";

import {
  toBadge,
  getChallengeBadge,
  insertInfoReadme,
  getFileNameByLocale,
  toDifficultyPlainText,
  toDifficultyBadgeInverted,
} from "@/utils";
import { Challenge } from "@/types";
import { DIFFICULTY_RANK, SUPPORTED_LOCALES } from "@/constants";
import { getAllTags, getQuizesByTag, getChallenges } from "@/db/challenge";

/**
 * update the root readme
 *
 * @param quizzes
 */
async function updateIndexREADME(challenges: Challenge[]) {
  // update index README
  for (const locale of SUPPORTED_LOCALES) {
    const filepath = path.resolve(__dirname, "..", getFileNameByLocale("README", locale, "md"));

    let challengesREADME = "";
    let prev = "";

    // sort by difficulty
    const quizesByDifficulty = [...challenges].sort(
      (a, b) => DIFFICULTY_RANK.indexOf(a.difficulty) - DIFFICULTY_RANK.indexOf(b.difficulty),
    );

    for (const challenge of quizesByDifficulty) {
      if (prev !== challenge.difficulty)
        challengesREADME += `${prev ? "<br><br>" : ""}${toDifficultyBadgeInverted(
          challenge.difficulty,
          locale,
          quizesByDifficulty.filter((q) => q.difficulty === challenge.difficulty).length,
        )}<br>`;

      challengesREADME += getChallengeBadge(challenge, locale);

      prev = challenge.difficulty;
    }

    // by tags
    challengesREADME += "<br><details><summary>By Tags</summary><br><table><tbody>";
    const tags = getAllTags(challenges, locale);
    for (const tag of tags) {
      challengesREADME += `<tr><td>${toBadge("", `#${tag}`, "999")}</td><td>`;
      getQuizesByTag(quizesByDifficulty, locale, tag).forEach((quiz) => {
        challengesREADME += getChallengeBadge(quiz, locale);
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
      challengesREADME += `<li>${getChallengeBadge(quiz, locale, false, false)}</li>`;
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
 * @param quizzes
 */
async function updateQuestionsREADME(quizzes: Challenge[]) {
  // update each questions' readme
  for (const quiz of quizzes) {
    for (const locale of SUPPORTED_LOCALES) {
      await insertInfoReadme(
        path.join("challenges", quiz.path, getFileNameByLocale("README", locale, "md")),
        quiz,
        locale,
        quizzes,
      );
    }
  }
}

export async function updateREADMEs(type?: "quiz" | "index") {
  const quizzes = await getChallenges();

  quizzes.sort((a, b) => a.no - b.no);

  if (type === "quiz") {
    return await updateQuestionsREADME(quizzes);
  }

  if (type === "index") {
    return await updateIndexREADME(quizzes);
  }

  await Promise.all([updateIndexREADME(quizzes), updateQuestionsREADME(quizzes)]);
}

updateREADMEs(process.argv.slice(2)[0] as any);
