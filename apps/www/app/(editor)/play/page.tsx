import dynamic from "next/dynamic";

import Loading from "./loading";

const PlaygroundPage = dynamic(
  () => import("~/screens/playground/ui/PlaygroundPage").then((mod) => mod.PlaygroundEditor),
  {
    ssr: false,
    loading: Loading,
  },
);

export default function Page() {
  return <PlaygroundPage />;
}
