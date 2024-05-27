"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge, Button, Icon } from "../ui";
import { useRouter } from "next/navigation";

export function SubmissionNavigator() {
  const router = useRouter();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="gap-1">
          <Icon name="plus" size="sm" />
          Submit
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end" sideOffset={8}>
        <DropdownMenuItem onSelect={() => router.push("/submit/question")}>
          <div className="flex gap-2">
            <Badge variant="quiz">
              <Icon name="code" size="sm" />
            </Badge>
            <div className="flex flex-col gap-1">
              <div>Question</div>
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
              <div>Quiz</div>
              <p className="text-xs text-[var(--color-fg-neutral-subtle)]">Challenges that tests concepts</p>
            </div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
