import { Quiz } from "@/types";
import { Badge, BadgeProps, Card, Icon } from "../ui";
import Link from "next/link";

function QuizListItem(props: { quiz: Quiz; showTypeIcon?: boolean }) {
  const { quiz, showTypeIcon } = props;

  return (
    <Card key={quiz.no} className="flex items-center space-x-6 px-4 py-4 md:px-6" role="listitem">
      <div className="flex grow flex-col gap-2">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Link
              className="text-base font-medium text-[var(--color-fg-accent)] hover:underline"
              href={`quizzes/${quiz.path}`}
            >
              {quiz.info.en?.title}
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--color-fg-neutral-subtle)]">#{quiz.no}</span>
          {showTypeIcon && (
            <Badge variant="quiz" className="px-1">
              <Icon name="file-text" size="sm" />
            </Badge>
          )}
          <div className="flex items-center gap-1">
            <Badge variant={quiz.difficulty as BadgeProps["variant"]}>{quiz.difficulty}</Badge>
            {quiz.info.en?.tags?.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        {/* <p className="text-sm text-[var(--color-fg-neutral-subtle)]">{question.info.en?.excerpt}</p> */}
      </div>
      <div></div>
    </Card>
  );
}

export { QuizListItem };
