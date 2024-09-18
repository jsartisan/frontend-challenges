"use client";

import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Badge, Button, Icon } from "../ui";

export function SubmissionNavigator() {
  const router = useRouter();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="hidden gap-1 md:flex">
          <Icon name="plus" size="sm" className="-ml-1" />
          Contribute
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end" sideOffset={8}>
        <DropdownMenuItem onSelect={() => router.push("/submit/question")}>
          <div className="flex gap-2">
            <Badge variant="quiz">
              <Icon name="code" size="sm" />
            </Badge>
            <div className="flex flex-col gap-1">
              <div>Submit Question</div>
              <p className="text-xs text-[var(--color-fg-neutral-subtle)]">Challenges that tests codig skills</p>
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => router.push("/submit/quiz")}>
          <div className="flex gap-2">
            <Badge variant="question">
              <Icon name="file-text" size="sm" />
            </Badge>
            <div className="flex flex-col gap-1">
              <div>Submit Quiz</div>
              <p className="text-xs text-[var(--color-fg-neutral-subtle)]">Challenges that tests concepts</p>
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-center">
          <a
            href="https://github.com/jsartisan/frontend-challenges/issues/new?assignees=jsartisan&labels=bug&projects=&template=bug.md&title=%5BBug%5D%3A+..."
            target="_blank"
            rel="noreferrer"
            aria-label="Report a bug"
            className="flex w-full items-center justify-center gap-2  text-center  "
          >
            <Icon name="bug" size="sm" />
            Report a bug
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
