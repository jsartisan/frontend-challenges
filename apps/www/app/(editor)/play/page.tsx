import dynamic from "next/dynamic";

import Loading from "./loading";

const PlaygroundEditor = dynamic(
  () => import("~/screens/playground/ui/PlaygroundPage").then((mod) => mod.PlaygroundEditor),
  {
    ssr: false,
    loading: Loading,
  },
);

export default function Page() {
  return <PlaygroundEditor />;
}
