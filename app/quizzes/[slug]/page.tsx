import Client from "./client";
import type { Metadata } from "next";
import { getQuizByPath, getQuizes } from "@/db/quiz";

export async function generateMetadata(props: any): Promise<Metadata> {
  const question = await getQuizByPath(props.params.slug);

  return {
    title: question.info.en?.title,
  };
}

export async function generateStaticParams() {
  const challenges = await getQuizes();

  return challenges.map((challenge) => ({
    slug: challenge.path,
  }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page(props: any) {
  const quiz = await getQuizByPath(props.params.slug);

  return <Client quiz={quiz} />;
}
