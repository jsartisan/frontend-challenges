import Client from "./client";
import type { Metadata } from "next";
import { getChallengeByPath, getChallenges } from "@/db/challenge";
import { Header } from "@/components/layout/Header";

export const revalidate = 3600;

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
  const challenges = await getChallenges();
  const challenge = await getChallengeByPath(props.params.slug);

  return (
    <>
      <Header challenges={challenges.map((challenge) => ({ path: challenge.path, title: challenge.info.en?.title }))} />
      <Client challenge={challenge} />
    </>
  );
}
