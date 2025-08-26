import { DeepPartial } from "utility-types";

import { ChallengeList } from "~/entities/challenge/model/types";

export type Roadmap = {
  title: string;
  path?: string;
  topics: {
    title: string;
    challenges: ChallengeList;
  }[];
  info: Record<string, DeepPartial<RoadmapInfo> | undefined>;
};

export type RoadmapInfo = {
  title: string;
  description: string;
  topics: {
    title: string;
    challenges: string[];
  }[];
};

export type RoadmapSlim = Pick<Roadmap, "title" | "path" | "info">;
export type RoadmapList = RoadmapSlim[];
