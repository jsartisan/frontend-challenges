import { getQuestions } from "@/db/question";
import Footer from "@/components/layout/Footer";
import { QuestionListWithFilters } from "@/components/questions/QuestionListWithFilters";

export default async function Page() {
  const questions = await getQuestions();

  return (
    <>
      <main className="mx-auto h-full max-w-screen-xl grow px-4 sm:px-6 md:order-1">
        <div className="flex flex-col gap-2 space-y-2 pt-12">
          <div className="text-3xl font-bold">Questions</div>
          <div className="w-2/4 leading-relaxed text-gray-500">
            FrontendEasy is a collection of frontend interview questions and answers. It is designed to help you prepare
            for frontend interviews. It&apos;s free and open source.
          </div>
        </div>
        <div className="mt-10 max-w-screen-lg">
          <div className="max-w-screen-lg">
            <QuestionListWithFilters questions={questions} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
