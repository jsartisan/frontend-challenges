import { RoadmapDetail } from "~/entities/roadmap/ui";
import { getRoadmapByPath } from "~/entities/roadmap/api";

async function RoadmapDetailPage(props: PageProps<"/challenges/[slug]">) {
  const slug = (await props.params).slug;

  const roadmap = await getRoadmapByPath(slug);

  return <RoadmapDetail roadmap={roadmap} />;
}

export { RoadmapDetailPage };
