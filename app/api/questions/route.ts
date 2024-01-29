import { getQuestions } from "@/db/question";

export async function GET() {
  const data = await getQuestions();

  return Response.json({ data });
}
