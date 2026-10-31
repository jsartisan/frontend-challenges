import { ChallengeList } from "~/entities/challenge/ui/ChallengeList";

import type { Roadmap } from "../model/types";

interface RoadmapDetailProps {
  roadmap: Roadmap;
}

function RoadmapDetail(props: RoadmapDetailProps) {
  const { roadmap } = props;
  const info = roadmap.info.en;
  const intro = info?.intro?.filter((paragraph): paragraph is string => Boolean(paragraph)) ?? [];

  return (
    <>
      <h1 className="text-3xl font-bold">{info?.heading ?? roadmap.title}</h1>
      <p className="text-muted-foreground w-full pb-6 pt-3 leading-relaxed md:w-2/4">{info?.description}</p>
      {intro.length > 0 && (
        <div className="flex w-full flex-col gap-3 pb-6 leading-relaxed md:w-2/3">
          {intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      )}
      <div className="flex flex-col gap-3">
        {roadmap.topics.map((topic) => (
          <div className="flex flex-col gap-1" key={`topic-${topic.title}`}>
            <h2 className="text-base font-semibold">{topic.title}</h2>
            {topic.description && <p className="text-muted-foreground text-sm">{topic.description}</p>}
            <ChallengeList challenges={topic.challenges} />
          </div>
        ))}
      </div>
    </>
  );
}

export { RoadmapDetail };
