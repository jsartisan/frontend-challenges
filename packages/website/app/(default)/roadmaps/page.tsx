import { getRoadmaps } from "@/backend";

import { RoadmapListItem } from "~/components/roadmaps/RoadmapListItem";

export default async function Page() {
  const roadmaps = await getRoadmaps();

  return (
    <>
      <div className="text-3xl font-bold">Roadmaps</div>
      <div className="w-full pb-6 pt-3 leading-relaxed text-gray-500 md:w-3/4">
        Roadmaps are a collection of challenges and quizzes that are designed to help you learn a specific language,
        framework, or topic. Each Roadmaps is curated by the community and is designed to help you learn a specific
        topic from scratch.
      </div>
      <div className="flex flex-col flex-wrap gap-3">
        {roadmaps.map((roadmap) => {
          return <RoadmapListItem studyPlan={roadmap} key={`roadmap-${roadmap.title}`} />;
        })}
      </div>
    </>
  );
}
