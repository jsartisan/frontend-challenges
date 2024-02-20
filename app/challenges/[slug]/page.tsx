import Client from "./client";
import type { Metadata } from "next";
import { getChallengeByPath, getChallenges } from "@/db/challenge";

export async function generateMetadata(props: any): Promise<Metadata> {
  const question = await getChallengeByPath(props.params.slug);

  return {
    title: question.info.en?.title,
  };
}

export async function generateStaticParams() {
  const challenges = await getChallenges();

  return challenges.map((challenge) => ({
    slug: challenge.path,
  }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page(props: any) {
  const challenge = await getChallengeByPath(props.params.slug);

  return <Client challenge={challenge} />;
}
