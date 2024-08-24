"use client";

import { useEffect } from "react";
import { Challenge } from "@frontend-challenges/shared";

import { mixpanel } from "../../../utils/mixpanel";

import { Quiz } from "./Quiz";
import { Question } from "./Question";

type ClientProps = {
  challenge: Challenge;
  challenges: Challenge[];
};

export default function Client(props: ClientProps) {
  const { challenge, challenges } = props;

  useEffect(() => {
    mixpanel.track("Challenge Viewed", {
      challenge: challenge.no,
      title: challenge.info?.en?.title,
    });
  }, [challenge]);

  if (challenge.type === "question") {
    return <Question question={challenge} challenges={challenges} />;
  }

  return <Quiz challenge={challenge} challenges={challenges} />;
}
