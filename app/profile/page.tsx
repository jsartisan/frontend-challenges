import { getChallenges } from "@/db/challenge";
import dynamic from "next/dynamic";

const Client = dynamic(() => import("./client"), {
  ssr: false,
});

export default async function Page() {
  const challenges = await getChallenges();

  return <Client challenges={challenges} />;
}
