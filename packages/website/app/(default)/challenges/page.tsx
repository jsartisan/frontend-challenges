import { getChallenges } from "@frontend-challenges/backend";

import CompletionStats from "~/components/interfaces/completions/CompletionStats";
import { ChallengeListWithFilters } from "~/components/interfaces/challenges/ChallengesListWithFilters";

export const dynamic = "force-static";

export default async function Page() {
  const challenges = await getChallenges();

  return (
    <>
      <header className="flex justify-between">
        <div>
          <div className="text-3xl font-bold">Challenges</div>
          <p className="w-full pb-6 pt-3 leading-relaxed text-[var(--color-fg-neutral)] md:w-2/4">
            Frontend Challenges is a collection of frontend interview questions and answers. It is designed to help you
            prepare for frontend interviews. It&apos;s free and open source.
          </p>
        </div>
        <CompletionStats challenges={challenges} />
      </header>
      <ChallengeListWithFilters challenges={challenges} />
    </>
  );
}
