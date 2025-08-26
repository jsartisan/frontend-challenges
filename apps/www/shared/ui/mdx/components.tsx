import dynamic from "next/dynamic";

import { Skeleton } from "~/components/ui";

import { CodeBlock } from "./CodeBlock";

const Sandpack = dynamic(() => import("./Sandpack").then((mod) => mod.Sandpack), {
  ssr: false,
  loading: () => <Skeleton className="h-20" />,
});

export const components = {
  Sandpack,
  pre: CodeBlock,
  h2: (props: any) => <h2 className="mb-3 mt-6 text-2xl font-bold" {...props} />,
  h3: (props: any) => <h3 className="mt-3 text-base font-semibold" {...props} />,
  p: (props: any) => <p className="leading-snug" {...props} />,
  ol: (props: any) => <ol className="flex flex-col gap-2" {...props} />,
  li: (props: any) => <li className="ml-4 list-disc [&_ul]:mt-2" {...props} />,
  ul: (props: any) => <ul className="flex flex-col gap-1" {...props} />,
  a: (props: any) => <a className="text-(--color-fg-accent-strong) font-semibold underline" {...props} />,
  code: (props: any) => (
    <code className="bg-(--color-bg-neutral-subtle) text-(--color-fg-neutral) rounded px-1 py-0.5" {...props} />
  ),
};
