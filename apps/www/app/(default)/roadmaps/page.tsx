import { Metadata } from "next";

import { getRoadmaps } from "~/entities/roadmap/api";
import { toDescription, createPageMetadata } from "~/shared/lib/seo";
import { RoadmapsListPage } from "~/screens/roadmaps/ui/RoadmapsListPage";

export async function generateMetadata(): Promise<Metadata> {
  const roadmaps = await getRoadmaps();
  const titles = roadmaps.map((roadmap) => roadmap.info?.en?.title ?? roadmap.title);

  return createPageMetadata({
    title: "Roadmaps | Frontend Challenges",
    description: toDescription(
      `Community-curated roadmaps that group Frontend Challenges questions and quizzes by topic${
        titles.length ? `: ${titles.join(", ")}` : ""
      }.`,
    ),
    path: "/roadmaps",
  });
}

export default RoadmapsListPage;
