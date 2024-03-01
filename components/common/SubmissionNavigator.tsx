"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge, Icon, IconButton } from "../ui";
import { useRouter } from "next/navigation";

export function SubmissionNavigator() {
  const router = useRouter();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <IconButton variant="tertiary" className="gap-2">
          <Icon name="plus" />
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
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
