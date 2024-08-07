import Link from "next/link";
import { StudyPlan } from "@frontend-challenges/shared";

import { Card } from "../ui";

function StudyPlanListItem(props: { studyPlan: StudyPlan }) {
  const { studyPlan } = props;

  return (
    <Card key={studyPlan.title} className="flex px-3 py-3 md:px-4" role="listitem">
      <div className="flex grow flex-col gap-2">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Link
              className="text-base font-medium text-[var(--color-fg-accent)] hover:underline"
              href={`/study-plans/${studyPlan.path}`}
            >
              {studyPlan.info.en?.title}
            </Link>
          </div>
        </div>
        <p className="text-sm text-[var(--color-fg-neutral-subtle)]">{studyPlan.info.en?.description}</p>
      </div>
    </Card>
  );
}

export { StudyPlanListItem };
