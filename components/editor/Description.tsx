import { Challenge } from "@/types";

import { Badge, BadgeProps } from "../ui/badge";
import { MDXComponent } from "../common/MDXComponent";

type DescriptionProps = {
  challenge: Challenge;
};

export default function Description(props: DescriptionProps) {
  const { challenge } = props;
  const { readme } = challenge;

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">
        {challenge.no} - {challenge.info["en"]?.title}
      </h1>
      <div className="flex gap-2">
        <Badge variant={challenge.difficulty as BadgeProps["variant"]}>{challenge.difficulty}</Badge>
        {challenge.info["en"]?.tags?.map((tag) => (
          <Badge variant="secondary" key={tag}>
            {tag}
          </Badge>
        ))}
      </div>
      <MDXComponent code={readme["en"]} />
    </div>
  );
}
