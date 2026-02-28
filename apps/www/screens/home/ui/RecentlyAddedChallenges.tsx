import { cn } from "~/utils/helpers";
import { ChallengeList } from "~/entities/challenge/ui/ChallengeList";
import { type ChallengeList as ChallengeListType } from "~/entities/challenge/model/types";

type RecentlyAddedChallengesProps = {
  challenges: ChallengeListType;
  className?: string;
};

export function RecentlyAddedChallenges(props: RecentlyAddedChallengesProps) {
  const { challenges, className } = props;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold">Recently Added</h3>
        <p className="text-muted-foreground">The newest challenges added by the community</p>
      </div>
      <ChallengeList showTypeIcon challenges={challenges} />
    </div>
  );
}
