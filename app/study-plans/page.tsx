import Footer from "@/components/layout/Footer";
import { getStudyPlans } from "@/db/study-plans";
import { Layout } from "@/components/layout/Layout";
import { StudyPlanListItem } from "@/components/study-plans/StudyPlanListItem";

export default async function Page() {
  const studyPlans = await getStudyPlans();

  return (
    <>
      <Layout className="pb-12 pt-8">
        <div className="text-3xl font-bold">Study Plans</div>
        <div className="w-full pb-6 pt-3 leading-relaxed text-gray-500 md:w-3/4">
          Study plans are a collection of challenges and quizzes that are designed to help you learn a specific
          language, framework, or topic. Each study plan is curated by the community and is designed to help you learn a
          specific topic from scratch.
        </div>
        {studyPlans.map((studyPlan) => {
          return <StudyPlanListItem studyPlan={studyPlan} key={`study-plan-${studyPlan.title}`} />;
        })}
      </Layout>

      <Footer />
    </>
  );
}
