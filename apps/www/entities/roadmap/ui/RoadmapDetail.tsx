import { ChallengeList } from "~/entities/challenge/ui/ChallengeList";

import type { Roadmap } from "../model/types";

interface RoadmapDetailProps {
  roadmap: Roadmap;
}

/**
 * RoadmapDetail displays the full details of a single roadmap
 *
 * Shows the roadmap title, description, and all topics with their challenges.
 * Each topic is displayed as a section with its own challenge list.
 *
 * @param props - Component props
 * @param props.roadmap - The roadmap data to display
 */
function RoadmapDetail(props: RoadmapDetailProps) {
  const { roadmap } = props;

  return (
    <>
      <div className="text-3xl font-bold">{roadmap.title}</div>
      <div className="w-full pb-6 pt-3 leading-relaxed text-gray-500 md:w-2/4">
        Roadmap are a collection of topics and challenges designed to help you learn a specific topic. It starts with
        the basics and progresses to more advanced topics.
      </div>
      <div className="flex flex-col gap-3">
        {roadmap.topics.map((topic) => (
          <div className="flex flex-col gap-1" key={`topic-${topic.title}`}>
            <h3 className="text-base font-semibold">{topic.title}</h3>
            <ChallengeList challenges={topic.challenges} />
          </div>
        ))}
      </div>
    </>
  );
}

export { RoadmapDetail };
