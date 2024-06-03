import { Challenge } from "@/types";

import { Badge, BadgeProps } from "../ui/badge";
import { MDXComponent } from "../common/MDXComponent";
import { Icon, IconButton } from "../ui";

type DescriptionProps = {
  challenge: Challenge;
};

export default function Description(props: DescriptionProps) {
  const { challenge } = props;
  const { readme } = challenge;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">
          {challenge.no} - {challenge.info["en"]?.title}
        </h1>
        <IconButton asChild variant="secondary" size="sm">
          <a href={challenge.githubURL} target="_blank" rel="noopener noreferrer">
            <Icon name="github" />
          </a>
        </IconButton>
      </div>
      <div className="flex items-center gap-2">
        <div className="me-1 flex items-center gap-2">
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
              {challenge.info["en"]?.author?.name}
            </span>
          </a>
        </div>
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
  );
}
