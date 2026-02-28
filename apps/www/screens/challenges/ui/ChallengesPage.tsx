import { Suspense } from "react";

import { getChallenges } from "~/entities/challenge/api/getChallenges";
import CompletionStats from "~/entities/completions/ui/CompletionStats";
import { ChallengeListWithFilters } from "~/entities/challenge/ui/ChallengeListWithFilters";

export async function ChallengesPage() {
  const challenges = await getChallenges();

  return (
    <>
      <header className="flex justify-between">
        <div>
          <div className="text-3xl font-bold">Challenges</div>
          <p className="text-muted-foreground w-full pb-6 pt-3 leading-relaxed md:w-2/4">
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
