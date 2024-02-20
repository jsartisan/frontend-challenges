import { getChallenges } from "@/db/challenge";

export async function GET() {
  const data = await getChallenges();

  return Response.json({ data });
}
