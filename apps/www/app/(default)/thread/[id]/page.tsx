import { ThreadPage } from "~/screens/thread";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ q?: string }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { q } = await searchParams;

  return <ThreadPage threadId={id} initialMessage={q} />;
}
