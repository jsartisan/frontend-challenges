import { getStudyPlanByPath, getStudyPlans } from "@/db/study-plans";

export default async function Page(props: any) {
  const studyPlans = await getStudyPlans();

  console.log({ studyPlans });

  return <div>Pawan</div>;
}
