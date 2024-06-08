import { ChallengeList } from "@/components/challenges/ChallengeList";
import Footer from "@/components/layout/Footer";
import { Layout } from "@/components/layout/Layout";
import { getStudyPlanByPath, getStudyPlans } from "@/db/study-plans";

export default async function Page(props: any) {
  const studyPlans = await getStudyPlans();

  return (
    <>
      <Layout className="pt-8 pb-12">
        <div className="text-3xl font-bold">Study Plans</div>
        <div className="w-full pt-3 pb-6 leading-relaxed text-gray-500 md:w-2/4">
          Frontend Challenges is a collection of frontend interview questions and answers. It is designed to help you
          prepare for frontend interviews. It&apos;s free and open source.
        </div>
        {studyPlans.map((studyPlan) => {
          return <div key={`study-plan-${studyPlan.title}`}>{studyPlan.title}</div>;
        })}
      </Layout>

      <Footer />
    </>
  );
}
