import type { RoadmapList as RoadmapListType } from "../model/types";

import { RoadmapListItem } from "./RoadmapListItem";

interface RoadmapListProps {
  roadmaps: RoadmapListType;
}

/**
 * RoadmapList displays a collection of roadmaps in a vertical list layout
 *
 * Renders each roadmap using RoadmapListItem component with consistent spacing.
 *
 * @param props - Component props
 * @param props.roadmaps - Array of roadmaps to display
 */
function RoadmapList(props: RoadmapListProps) {
  const { roadmaps } = props;

  return (
    <div className="flex flex-col flex-wrap gap-3">
      {roadmaps.map((roadmap) => (
        <RoadmapListItem roadmap={roadmap} key={`roadmap-${roadmap.title}`} />
      ))}
    </div>
  );
}

export { RoadmapList };
