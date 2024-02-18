import Footer from "@/components/layout/Footer";
import { QuizListWithFilters } from "@/components/quizzes/QuizListWithFilters";
import { getQuizes } from "@/db/quiz";

export default async function Page() {
  const quizzes = await getQuizes();

  return (
    <>
      <main className="mx-auto flex h-full max-w-screen-xl grow flex-col gap-4 px-4 sm:px-6 md:order-1">
        <div className="flex flex-col gap-2 space-y-2 pt-12">
          <div className="text-3xl font-bold">Quiz</div>
          <div className="w-2/4 leading-relaxed text-gray-500">
            Frontend Challenges is a collection of frontend interview questions and answers. It is designed to help you
            prepare for frontend interviews. It&apos;s free and open source.
          </div>
        </div>
        <QuizListWithFilters quizzes={quizzes} />
      </main>
      <Footer />
    </>
  );
}
