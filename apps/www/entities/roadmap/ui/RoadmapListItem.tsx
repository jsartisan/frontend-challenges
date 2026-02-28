import { Card, Link } from "~/components/ui";

import type { RoadmapSlim } from "../model/types";

interface RoadmapListItemProps {
  roadmap: RoadmapSlim;
}

/**
 * RoadmapListItem displays a single roadmap in a list view
 *
 * Shows roadmap title, description and links to the roadmap details page.
 * Uses a card layout with hover effects for better UX.
 *
 * @param props - Component props
 * @param props.roadmap - The roadmap data to display
 */
function RoadmapListItem(props: RoadmapListItemProps) {
  const { roadmap } = props;

  return (
    <Card key={roadmap.title} className="flex px-3 py-3 md:px-4" role="listitem">
      <div className="flex grow flex-col gap-2">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Link
              className="text-primary text-base font-medium hover:underline"
              href={`/roadmaps/${roadmap.path}`}
            >
              {roadmap.info.en?.title}
            </Link>
          </div>
        </div>
        <p className="text-muted-foreground/60 text-sm">{roadmap.info.en?.description}</p>
      </div>
    </Card>
  );
}

export { RoadmapListItem };
