"use client";

import { useEffect } from "react";
import { Challenge } from "@frontend-challenges/shared";

import { mixpanel } from "../../../utils/mixpanel";

import { Quiz } from "./Quiz";
import { Question } from "./Question";

export default function Client(props: { challenge: Challenge }) {
  const { challenge } = props;

  useEffect(() => {
    mixpanel.track("Challenge Viewed", {
      challenge: challenge.no,
      title: challenge.info?.en?.title,
    });
  }, [challenge]);

  return challenge.type === "question" ? <Question question={challenge} /> : <Quiz quiz={challenge} />;
}
