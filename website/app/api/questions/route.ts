import { getChallenges } from "@/utils/challenges";

export async function GET() {
  const data = await getChallenges();

  return Response.json({ data });
}
