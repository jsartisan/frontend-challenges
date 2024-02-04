import { getQuizes } from "./quiz";
import { getQuestions } from "./question";

export async function getChallenges() {
  const quizzes = await getQuizes();
  const questions = await getQuestions();

  return [...quizzes, ...questions].sort((a, b) => a.no - b.no);
}
