import { getChallenges } from "@/backend";

import CompletionStats from "~/components/interfaces/completions/CompletionStats";
import { ChallengeListWithFilters } from "~/components/interfaces/challenges/ChallengesListWithFilters";
import { Suspense } from "react";

export const dynamic = "force-static";

export default async function Page() {
  const challenges = await getChallenges();

  return (
    <>
      <header className="flex justify-between">
        <div>
          <div className="text-3xl font-bold">Challenges</div>
          <p className="text-(--color-fg-neutral) w-full pb-6 pt-3 leading-relaxed md:w-2/4">
            Frontend Challenges is a collection of frontend interview questions and answers. It is designed to help you
            prepare for frontend interviews. It&apos;s free and open source.
          </p>
        </div>
        <CompletionStats challenges={challenges} />
      </header>
      <Suspense fallback={<>Loading...</>}>
        <ChallengeListWithFilters challenges={challenges} />
      </Suspense>
    </>
  );
}
