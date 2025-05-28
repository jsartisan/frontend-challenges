import { Challenge } from "@/shared";
import { ChallengeList } from "~/components/interfaces/challenges/ChallengeList";

type RecentlyAddedChallengesProps = {
  challenges: Challenge[];
};

export function RecentlyAddedChallenges(props: RecentlyAddedChallengesProps) {
  const { challenges } = props;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold">Recently Added</h3>
        <p className="text-fg-subtle">The newest challenges added by the community</p>
      </div>
      <ChallengeList showTypeIcon challenges={challenges} />
    </div>
  );
}
