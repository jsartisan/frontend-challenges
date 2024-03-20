import { getChallenges } from "@/db/challenge";
import Footer from "@/components/layout/Footer";
import { ChallengeListWithFilters } from "@/components/challenges/ChallengeListWithFilters";
import { Header } from "@/components/layout/Header";

export default async function Page() {
  const challenges = await getChallenges();

  return (
    <>
      <Header challenges={challenges} />
      <main className="mx-auto flex h-full max-w-screen-xl grow flex-col gap-4 px-4 sm:px-6 md:order-1">
        <div className="flex flex-col gap-2 space-y-2 pt-12">
          <div className="text-3xl font-bold">Challenges</div>
          <div className="w-full leading-relaxed text-gray-500 md:w-2/4">
            Frontend Challenges is a collection of frontend interview questions and answers. It is designed to help you
            prepare for frontend interviews. It&apos;s free and open source.
          </div>
        </div>
        <ChallengeListWithFilters challenges={challenges} />
      </main>
      <Footer />
    </>
  );
}
