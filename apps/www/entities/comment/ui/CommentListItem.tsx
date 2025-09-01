import React from "react";
import Markdown from "react-markdown";
import { formatDistanceToNow } from "date-fns";

import { cn } from "~/utils/helpers";
import { Comment } from "~/entities/comment/model/types";
import { Avatar, AvatarImage } from "~/components/ui/avatar";

interface CommentListItemProps {
  comment: Comment;
  className?: string;
}

const reactionEmojis: Record<keyof Comment["reactions"], string> = {
  "+1": "👍",
  "-1": "👎",
  laugh: "😄",
  hooray: "🎉",
  confused: "😕",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
};

export const CommentListItem = (props: CommentListItemProps) => {
  const { className, comment } = props;

  const hasCommentsReactions = Object.entries(comment.reactions).some(([, count]) => count > 0);

  return (
    <div
      className={cn(
        "bg-(--color-bg-neutral-subtle) border-(--color-border) hover:bg-(--color-bg-neutral-hover) relative flex gap-3 rounded border p-3",
        className,
      )}
    >
      {/* Avatar */}
      <Avatar>
        <AvatarImage src={comment.user.avatar_url} alt={comment.user.login} />
      </Avatar>

      {/* Main content */}
      <div className="flex flex-1 flex-col gap-2">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-(--color-fg-primary) font-semibold">{comment.user.login}</span>
          <span className="text-(--color-fg-neutral-subtle)">
            commented {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
          </span>
        </div>

        {/* Body */}
        <Markdown className="prose prose-sm text-(--color-fg-neutral) max-w-none">{comment.body}</Markdown>

        {/* Reactions */}
        {hasCommentsReactions && (
          <div className="flex flex-wrap gap-2 pt-1">
            {Object.entries(comment.reactions)
              .filter(([key]) => key in reactionEmojis)
              .map(([key, count]) => {
                if (count === 0) return null;

                const emoji = reactionEmojis[key as keyof Comment["reactions"]];

                return (
                  <span
                    key={key}
                    className="border-(--color-border) bg-(--color-bg-neutral) text-(--color-fg-neutral) flex items-center gap-1 rounded border px-2 py-0.5 text-xs"
                  >
                    {emoji} {count}
                  </span>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};
