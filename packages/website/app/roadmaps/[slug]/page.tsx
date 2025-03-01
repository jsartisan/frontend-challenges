import { Metadata } from "next";
import { DOMAIN } from "@/shared";
import { getRoadmapByPath, getRoadmaps } from "@frontend-challenges/backend";

import Footer from "../../../components/layout/Footer";
import { Layout } from "../../../components/layout/Layout";
import { ChallengeList } from "../../../components/challenges/ChallengeList";

export async function generateMetadata(props: any): Promise<Metadata> {
  const question = await getRoadmapByPath(props.params.slug);

  return {
    title: `${question.info?.en?.title} Roadmap | Frontend Challenges`,
    openGraph: {
      url: `${DOMAIN}/roadmaps/${question.path}`,
      images: "/og.png",
    },
  };
}

export async function generateStaticParams() {
  const studyPlans = await getRoadmaps();

  return studyPlans.map((studyPlan) => ({
    slug: studyPlan.path,
  }));
}

export default async function Page(props: any) {
  const studyPlan = await getRoadmapByPath(props.params.slug);

  return (
    <>
      <Layout className="pb-12 pt-8">
        <div className="text-3xl font-bold">{studyPlan.title}</div>
        <div className="w-full pb-6 pt-3 leading-relaxed text-gray-500 md:w-2/4">
          Roadmap are a collection of topics and challenges designed to help you learn a specific topic. It starts with
          the basics and progresses to more advanced topics.
        </div>
        <div className="flex flex-col gap-3">
          {studyPlan.topics.map((topic) => {
            return (
              <div className="flex flex-col gap-1" key={`topic-${topic.title}`}>
                <h3 className="text-base font-semibold ">{topic.title}</h3>
                <ChallengeList challenges={topic.challenges} />
              </div>
            );
          })}
        </div>
      </Layout>

      <Footer />
    </>
  );
}
