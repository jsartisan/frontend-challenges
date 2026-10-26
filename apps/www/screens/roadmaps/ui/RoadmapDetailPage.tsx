import { JsonLd } from "~/shared/ui/JsonLd";
import { toDescription } from "~/shared/lib/seo";
import { roadmapJsonLd } from "~/shared/lib/structuredData";
import { RoadmapDetail } from "~/entities/roadmap/ui";
import { getRoadmapByPath } from "~/entities/roadmap/api";

async function RoadmapDetailPage(props: PageProps<"/challenges/[slug]">) {
  const slug = (await props.params).slug;

  const roadmap = await getRoadmapByPath(slug);
  const challenges = [...new Map(roadmap.topics.flatMap((topic) => topic.challenges).map((c) => [c.path, c])).values()];

  return (
    <>
      <JsonLd
        data={roadmapJsonLd({
          title: roadmap.title,
          description: toDescription(
            roadmap.info.en?.description ?? `${roadmap.title} roadmap on Frontend Challenges.`,
          ),
          path: `/roadmaps/${roadmap.path}`,
          challenges,
        })}
      />
      <RoadmapDetail roadmap={roadmap} />
    </>
  );
}

export { RoadmapDetailPage };
