import { RoadmapDetail } from "~/entities/roadmap/ui";
import { getRoadmapByPath } from "~/entities/roadmap/api";

interface RoadmapDetailPageProps {
  params: {
    slug: string;
  };
}

async function RoadmapDetailPage(props: RoadmapDetailPageProps) {
  const { slug } = props.params;

  const roadmap = await getRoadmapByPath(slug);

  return <RoadmapDetail roadmap={roadmap} />;
}

export { RoadmapDetailPage };
