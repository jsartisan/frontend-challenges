import Link from "next/link";
import { Question } from "@/types";

type CategoryListProps = {
  questions: Question[];
};

export function CategoryList(props: CategoryListProps) {
  const { questions } = props;

  return (
    <div className="mx-auto flex max-w-screen-md flex-col gap-3 rounded-lg">
      {questions.map((question) => {
        return (
          <div
            key={question.no}
            className="text-gray-90 flex items-center space-x-6 rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-4 text-sm font-medium text-gray-600 md:px-6"
            role="listitem"
          >
            <div className="w-8 shrink-0 text-center text-xl">{question.no}</div>
            <div className="grow">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Link
                    className="text-base text-[var(--color-fg-accent)] hover:underline"
                    href={`questions/${question.path}`}
                  >
                    {question.info.en?.title}
                  </Link>
                </div>
              </div>
              <div className="flex space-x-2">
                <span className="text-emerald-500">{question.difficulty}</span>
                <span className="not-sr-only">·</span>
                <span>15 mins</span>
                <span className="not-sr-only">·</span>
                <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                  Array
                </span>
              </div>
            </div>
            <div className="shrink">
              <button
                aria-label="Mark Two Sum as complete"
                className="inline-flex items-center rounded-full border border-transparent p-0 text-gray-300 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-1"
                type="button"
              ></button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
