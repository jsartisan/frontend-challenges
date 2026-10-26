"use client";

import { useEffect } from "react";

import { track } from "~/shared/lib/analytics";

type TrackChallengeViewProps = {
  properties: Record<string, unknown>;
};

export function TrackChallengeView(props: TrackChallengeViewProps) {
  const { properties } = props;

  useEffect(() => {
    track("Challenge Viewed", properties);
  }, [properties]);

  return null;
}
