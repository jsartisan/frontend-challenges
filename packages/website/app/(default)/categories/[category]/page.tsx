import { CATEGORIES } from "@/shared";
import { getChallenges } from "@/backend";
import { filterChallengesByCategory } from "~/utils/challenges";
import CompletionStats from "~/components/interfaces/completions/CompletionStats";
import { ChallengeListWithFilters } from "~/components/interfaces/challenges/ChallengesListWithFilters";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    category,
  }));
}

export default async function Page(props: any) {
  const challenges = await getChallenges();
  const challengesByCategory = filterChallengesByCategory(challenges, props.params.category);

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
        <CompletionStats challenges={challengesByCategory} />
      </header>
      <ChallengeListWithFilters challenges={challengesByCategory} />
    </>
  );
}
