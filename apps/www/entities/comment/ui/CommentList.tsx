import { ComponentPropsWithoutRef } from "react";

import { cn } from "~/utils/helpers";
import { REPO } from "~/shared/config/paths";
import { Button, Skeleton } from "~/components/ui";
import { Challenge } from "~/entities/challenge/model/types";
import { useComment } from "~/entities/comment/hooks/useComment";

import { CommentListItem } from "./CommentListItem";

type ResourceListProps = ComponentPropsWithoutRef<"div"> & {
  challenge: Challenge;
  className?: string;
};

export function CommentList(props: ResourceListProps) {
  const { challenge, className, ...rest } = props;
  const { data: comments, isLoading } = useComment(challenge.no);

  if (isLoading) {
    return (
      <div className={cn("flex flex-col gap-4", className)} {...rest}>
        {[...Array(3)].map((_, index) => (
          <Skeleton className="h-12" key={index}></Skeleton>
        ))}
      </div>
    );
  }

  if ((comments || []).length === 0) {
    return (
      <div className={cn("flex h-full flex-col items-center justify-center gap-2 text-center", className)} {...rest}>
        <p className="text-3xl">📋</p>
        <p className="text-lg font-semibold">No comments yet.</p>
        <p className="text-(--color-fg-neutral-subtle) text-sm">To add a comment, edit the info.yml and raise a PR!</p>
        <Button asChild size="xs" variant="secondary" className="mt-2">
          <a target="_blank" href={`${REPO}/issues/${challenge.no}`}>
            Add Comment
          </a>
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("h-full w-full overflow-y-auto p-3", className)} {...rest}>
      <div className="flex flex-col gap-2">
        {comments?.map((comment) => <CommentListItem key={comment.id} comment={comment as any} />)}
      </div>
    </div>
  );
}
