import type { Metadata } from "next";
import { DOMAIN } from "@/shared";
import { getChallengeByPath, getChallenges } from "@frontend-challenges/backend";

import Client from "./client";

export const revalidate = 3600;
export const dynamicParams = false;
export const dynamic = "force-static";

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const question = await getChallengeByPath(props.params.slug);

  return {
    title: `${question.info?.en?.title} | Frontend Challenges`,
    openGraph: {
      url: `${DOMAIN}/challenges/${question.path}`,
      images: "/og.png",
    },
  };
}

export async function generateStaticParams() {
  const challenges = await getChallenges();

  return challenges.map((challenge) => ({
    slug: challenge.path,
  }));
}

export default async function Page(props: PageProps) {
  const challenge = await getChallengeByPath(props.params.slug);

  return <Client challenge={challenge} />;
}
