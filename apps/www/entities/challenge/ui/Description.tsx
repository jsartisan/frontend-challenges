import dynamic from "next/dynamic";
import { ComponentPropsWithoutRef } from "react";

import { cn } from "~/utils/helpers";
import { Skeleton } from "~/components/ui";
import { Badge, BadgeProps } from "~/components/ui/badge";
import { MDXComponent } from "~/shared/ui/mdx/MDXComponent";
import { Challenge } from "~/entities/challenge/model/types";

const EditChallengeDropdown = dynamic(
  () => import("~/entities/challenge/ui/EditChallengeDropdown").then((mod) => mod.EditChallengeDropdown),
  {
    ssr: false,
    loading: () => <Skeleton className="secondary size-6" />,
  },
);

type DescriptionProps = ComponentPropsWithoutRef<"div"> & {
  challenge: Challenge;
  className?: string;
};

export function Description(props: DescriptionProps) {
  const { challenge, className, ...rest } = props;
  const { readme } = challenge;

  return (
    <div className={cn("h-full w-full overflow-y-auto p-3", className)} {...rest}>
      <div className="flex flex-col gap-2">
        <header className="flex h-7 items-center gap-3">
          <h1 className="flex h-[1cap] items-center gap-2 text-2xl font-bold">
            <span className="text-(--color-fg-neutral-subtle)">#{challenge.no}</span> {challenge.info["en"]?.title}
          </h1>
          <div className="ms-auto flex gap-2">
            <EditChallengeDropdown challenge={challenge} />
          </div>
        </header>
        <div className="flex items-center gap-2">
          <aside className="me-1 flex items-center gap-2">
            <span className="block whitespace-nowrap text-xs">by</span>
            <a
              href={`https://github.com/${challenge.info["en"]?.author?.github}`}
              target="_blank"
              className="flex items-center gap-1"
              rel="noreferrer"
            >
              <span className="inline-flex size-5 shrink-0 select-none items-center justify-center overflow-hidden rounded-full">
                <img
                  alt={challenge.info["en"]?.author?.name}
                  className="size-full object-cover"
                  src={challenge.info["en"]?.author?.avatar_url}
                />
              </span>
              <span className="block whitespace-nowrap text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                {challenge.info["en"]?.author?.name ?? challenge.info["en"]?.author?.github}
              </span>
            </a>
          </aside>
          <Badge variant={challenge.difficulty as BadgeProps["variant"]}>{challenge.difficulty}</Badge>
          {challenge.info["en"]?.tags?.map((tag) => (
            <Badge variant="secondary" key={tag}>
              {tag}
            </Badge>
          ))}
        </div>
        <div className="mt-1 flex flex-col gap-2">
          <MDXComponent code={readme["en"]} />
        </div>
      </div>
    </div>
  );
}
