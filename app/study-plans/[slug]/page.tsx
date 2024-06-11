import { ChallengeList } from "@/components/challenges/ChallengeList";
import Footer from "@/components/layout/Footer";
import { Layout } from "@/components/layout/Layout";
import { getStudyPlanByPath } from "@/db/study-plans";

export default async function Page(props: any) {
  const studyPlan = await getStudyPlanByPath(props.params.slug);

  return (
    <>
      <Layout className="pb-12 pt-8">
        <div className="text-3xl font-bold">{studyPlan.title}</div>
        <div className="w-full pb-6 pt-3 leading-relaxed text-gray-500 md:w-2/4">
          Study Plans are a collection of topics and challenges designed to help you learn a specific topic. It starts
          with the basics and progresses to more advanced topics.
        </div>
        {studyPlan.topics.map((topic) => {
          return (
            <div className="flex flex-col gap-2" key={`topic-${topic.title}`}>
              <h3 className="text-base font-semibold ">{topic.title}</h3>
              <ChallengeList challenges={topic.challenges} />
            </div>
          );
        })}
      </Layout>

      <Footer />
    </>
  );
}
