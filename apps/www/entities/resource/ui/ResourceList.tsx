import { ComponentPropsWithoutRef } from "react";

import { cn } from "~/utils/helpers";
import { Button } from "~/components/ui";
import { DEFAULT_LOCALE } from "~/shared/config/locale";
import { Challenge } from "~/entities/challenge/model/types";
import { ResourceListItem } from "~/entities/resource/ui/ResourceListItem";

type ResourceListProps = ComponentPropsWithoutRef<"div"> & {
  challenge: Challenge;
  className?: string;
};

export function ResourceList(props: ResourceListProps) {
  const { challenge, className, ...rest } = props;
  const resources = challenge?.info[DEFAULT_LOCALE]?.resources || [];

  if ((resources || []).length === 0) {
    return (
      <div className={cn("flex h-full flex-col items-center justify-center gap-2 text-center", className)} {...rest}>
        <p className="text-3xl">📋</p>
        <p className="text-lg font-semibold">No resources yet.</p>
        <p className="text-muted-foreground/60 text-sm">To add a resource, edit the info.yml and raise a PR!</p>
        <Button asChild size="xs" variant="secondary" className="mt-2">
          <a target="_blank" href={`${challenge.editURL as string}/info.yml`}>
            Add Resource
          </a>
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("h-full w-full overflow-y-auto p-3", className)} {...rest}>
      <div className="flex flex-col gap-2">
        {resources.map((resource) => (
          <ResourceListItem key={resource} resource={resource as string} />
        ))}
      </div>
    </div>
  );
}
