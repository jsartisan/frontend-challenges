import Client from "./client";
import type { Metadata } from "next";
import { getQuestionByPath, getQuestions } from "@/db/question";

export async function generateMetadata(props: any): Promise<Metadata> {
  const question = await getQuestionByPath(props.params.slug);

  return {
    title: question.info.en?.title,
  };
}

export async function generateStaticParams() {
  const questions = await getQuestions();

  return questions.map((question) => ({
    slug: question.path,
  }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page(props: any) {
  const question = await getQuestionByPath(props.params.slug);

  return <Client question={question} />;
}
