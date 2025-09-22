import { Metadata } from "next";

import { DOMAIN } from "~/shared/config/paths";
import { getRoadmapByPath, getRoadmaps } from "~/entities/roadmap/api";
import { RoadmapDetailPage } from "~/screens/roadmaps/ui/RoadmapDetailPage";

export async function generateMetadata(props: PageProps<"/roadmaps/[slug]">): Promise<Metadata> {
  const roadmap = await getRoadmapByPath((await props.params).slug);

  return {
    title: `${roadmap.info?.en?.title} Roadmap | Frontend Challenges`,
    openGraph: {
      url: `${DOMAIN}/roadmaps/${roadmap.path}`,
      images: "/og.png",
    },
  };
}

export async function generateStaticParams() {
  const roadmaps = await getRoadmaps();

  return roadmaps.map((roadmap) => ({
    slug: roadmap.path,
  }));
}

export default RoadmapDetailPage;
