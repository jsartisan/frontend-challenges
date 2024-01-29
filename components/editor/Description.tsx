import { Question } from "@/types";

import { Badge, BadgeProps } from "../ui/badge";
import { MDXComponent } from "../common/MDXComponent";

type DescriptionProps = {
  question: Question;
};

export default function Description(props: DescriptionProps) {
  const { question } = props;
  const { readme } = question;

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">
        {question.no} - {question.info["en"]?.title}
      </h1>
      <div className="flex gap-2">
        <Badge variant={question.difficulty as BadgeProps["variant"]}>{question.difficulty}</Badge>
        {question.info["en"]?.tags?.map((tag) => (
          <Badge variant="secondary" key={tag}>
            {tag}
          </Badge>
        ))}
      </div>
      <MDXComponent code={readme["en"]} />
    </div>
  );
}
