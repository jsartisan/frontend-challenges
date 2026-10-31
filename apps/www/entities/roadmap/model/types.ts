import { DeepPartial } from "utility-types";

import { ChallengeList } from "~/entities/challenge/model/types";

export type Roadmap = {
  title: string;
  path?: string;
  topics: {
    title: string;
    description?: string;
    challenges: ChallengeList;
  }[];
  info: Record<string, DeepPartial<RoadmapInfo> | undefined>;
};

export type RoadmapInfo = {
  title: string;
  /** Optional page heading (H1 and SEO title) when it should differ from the short `title` used in lists. */
  heading?: string;
  description: string;
  /** Optional intro paragraphs shown under the heading. */
  intro?: string[];
  topics: {
    title: string;
    description?: string;
    challenges: string[];
  }[];
};

export type RoadmapSlim = Pick<Roadmap, "title" | "path" | "info">;
export type RoadmapList = RoadmapSlim[];
