import { ChallengeList } from "~/entities/challenge/ui/ChallengeList";
import { type ChallengeList as ChallengeListType } from "~/entities/challenge/model/types";

type RecentlyAddedChallengesProps = {
  challenges: ChallengeListType;
};

export function RecentlyAddedChallenges(props: RecentlyAddedChallengesProps) {
  const { challenges } = props;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold">Recently Added</h3>
        <p className="text-(--color-fg-subtle)">The newest challenges added by the community</p>
      </div>
      <ChallengeList showTypeIcon challenges={challenges} />
    </div>
  );
}
