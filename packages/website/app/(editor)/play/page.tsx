import dynamic from "next/dynamic";

import Loading from "./loading";

const PlaygroundEditor = dynamic(
  () => import("../../../components/interfaces/playground/PlaygroundEditor").then((mod) => mod.PlaygroundEditor),
  {
    ssr: false,
    loading: Loading,
  },
);

export default async function Page() {
  return <PlaygroundEditor />;
}
