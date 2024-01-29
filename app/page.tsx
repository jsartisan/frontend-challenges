import { Hero } from "@/components/home/Hero";
import { getQuestions } from "@/db/question";
import { Community } from "@/components/home/Community";
import { QuestionList } from "@/components/questions/QuestionList";
import Footer from "@/components/layout/Footer";
import { DEFAULT_LOCALE } from "@/constants";

export default async function Page() {
  const questions = await getQuestions();
  const sortedQuestions = questions.slice(0, 5).sort((a, b) => {
    const aDate = new Date(a.info[DEFAULT_LOCALE]?.published_date || "1970-01-01");
    const bDate = new Date(b.info[DEFAULT_LOCALE]?.published_date || "1970-01-01");

    return bDate.getTime() - aDate.getTime();
  });

  return (
    <>
      <main className="h-full grow px-4 pb-16 sm:px-6 md:order-1">
        <div className="mx-auto max-w-screen-xl">
          <Hero />
          <div className="py-8" />
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-bold">Recently Added</h3>
              <p className="text-fg-subtle">The newest challeges added by the community</p>
            </div>
            <div className="max-w-screen-lg">
              <QuestionList questions={sortedQuestions} />
            </div>
          </div>
        </div>
      </main>
      <Community />
      <Footer />
    </>
  );
}
