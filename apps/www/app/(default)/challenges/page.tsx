export const dynamic = "force-static";

import { Metadata } from "next";

import { createPageMetadata } from "~/shared/lib/seo";
import { ChallengesPage } from "~/screens/challenges/ui";
import { getChallenges } from "~/entities/challenge/api/getChallenges";

export async function generateMetadata(): Promise<Metadata> {
  const challenges = await getChallenges();

  return createPageMetadata({
    title: "Frontend Coding Challenges & Interview Questions | Frontend Challenges",
    description: `Browse ${challenges.length} free frontend coding challenges and interview questions in JavaScript, React and CSS. Filter by category, difficulty and type.`,
    path: "/challenges",
  });
}

export default ChallengesPage;
