import { Roadmap } from "@/shared";

import { Card, Link } from "../ui";

function RoadmapListItem(props: { studyPlan: Roadmap }) {
  const { studyPlan } = props;

  return (
    <Card key={studyPlan.title} className="flex px-3 py-3 md:px-4" role="listitem">
      <div className="flex grow flex-col gap-2">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Link
              className="text-(--color-fg-accent) text-base font-medium hover:underline"
              href={`/roadmaps/${studyPlan.path}`}
            >
              {studyPlan.info.en?.title}
            </Link>
          </div>
        </div>
        <p className="text-(--color-fg-neutral-subtle) text-sm">{studyPlan.info.en?.description}</p>
      </div>
    </Card>
  );
}

export { RoadmapListItem };
