import { getStudyPlanByPath } from "@/db/study-plans";

export default async function Page(props: any) {
  const studyPlan = await getStudyPlanByPath(props.params.slug);

  console.log({ studyPlan });

  return <div>Pawan</div>;
}
