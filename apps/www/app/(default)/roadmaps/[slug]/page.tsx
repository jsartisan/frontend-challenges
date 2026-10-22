import { Metadata } from "next";

import { toDescription, createPageMetadata } from "~/shared/lib/seo";
import { getRoadmapByPath, getRoadmaps } from "~/entities/roadmap/api";
import { RoadmapDetailPage } from "~/screens/roadmaps/ui/RoadmapDetailPage";

export async function generateMetadata(props: PageProps<"/roadmaps/[slug]">): Promise<Metadata> {
  const roadmap = await getRoadmapByPath((await props.params).slug);
  const title = roadmap.info?.en?.title ?? roadmap.title;
  const challengeCount = roadmap.topics.reduce((total, topic) => total + topic.challenges.length, 0);
  const summary = `${title} roadmap: ${challengeCount} challenges across ${roadmap.topics.length} topics on Frontend Challenges.`;

  return createPageMetadata({
    title: `${title} Roadmap | Frontend Challenges`,
    description: toDescription(roadmap.info?.en?.description ?? summary),
    path: `/roadmaps/${roadmap.path}`,
  });
}

export async function generateStaticParams() {
  const roadmaps = await getRoadmaps();

  return roadmaps.map((roadmap) => ({
    slug: roadmap.path,
  }));
}

export default RoadmapDetailPage;
