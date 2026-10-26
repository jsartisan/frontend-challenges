import type { Metadata } from "next";

import { JsonLd } from "~/shared/ui/JsonLd";
import { createPageMetadata } from "~/shared/lib/seo";
import { DEFAULT_LOCALE } from "~/shared/config/locale";
import { challengeJsonLd } from "~/shared/lib/structuredData";
import { describeChallenge } from "~/shared/lib/describeChallenge";
import { Quiz } from "~/entities/challenge/ui/Quiz";
import { Theory } from "~/entities/challenge/ui/Theory";
import { Question } from "~/entities/challenge/ui/Question";
import { getChallenges } from "~/entities/challenge/api/getChallenges";
import { LayoutProvider } from "~/features/code-editor/context/LayoutProvider";
import { getChallengeByPath } from "~/entities/challenge/api/getChallengeByPath";

export async function generateMetadata(props: PageProps<"/challenges/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;

  const question = await getChallengeByPath(slug);

  return createPageMetadata({
    title: `${question.info?.[DEFAULT_LOCALE]?.title} | Frontend Challenges`,
    description: describeChallenge(question),
    path: `/challenges/${question.path}`,
  });
}

export async function generateStaticParams() {
  const challenges = await getChallenges();

  return challenges.map((challenge) => ({
    slug: challenge.path,
  }));
}

export async function ChallengePage(props: PageProps<"/challenges/[slug]">) {
  const challenge = await getChallengeByPath((await props.params).slug);

  return (
    <>
      <JsonLd data={challengeJsonLd(challenge)} />
      <LayoutProvider defaultValue={challenge.info?.en?.tags?.includes("ui-coding") ? "layout-2" : undefined}>
        {challenge.type === "quiz" && <Quiz challenge={challenge} />}
        {challenge.type === "question" && <Question challenge={challenge} />}
        {challenge.type === "theory" && <Theory challenge={challenge} />}
      </LayoutProvider>
    </>
  );
}
