"use server";

import type { Metadata } from "next";

import { DOMAIN } from "~/shared/config/paths";
import { Quiz } from "~/entities/challenge/ui/Quiz";
import { Theory } from "~/entities/challenge/ui/Theory";
import { Question } from "~/entities/challenge/ui/Question";
import { getChallenges } from "~/entities/challenge/api/getChallenges";
import { LayoutProvider } from "~/features/code-editor/context/LayoutProvider";
import { getChallengeByPath } from "~/entities/challenge/api/getChallengeByPath";

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const question = await getChallengeByPath(props.params.slug);

  return {
    title: `${question.info?.en?.title} | Frontend Challenges`,
    openGraph: {
      url: `${DOMAIN}/challenges/${question.path}`,
      images: "/og.png",
    },
  };
}

export async function generateStaticParams() {
  const challenges = await getChallenges();

  return challenges.map((challenge) => ({
    slug: challenge.path,
  }));
}

export async function ChallengePage(props: PageProps) {
  const challenge = await getChallengeByPath(props.params.slug);

  return (
    <LayoutProvider>
      {challenge.type === "quiz" && <Quiz challenge={challenge} />}
      {challenge.type === "question" && <Question challenge={challenge} />}
      {challenge.type === "theory" && <Theory challenge={challenge} />}
    </LayoutProvider>
  );
}
