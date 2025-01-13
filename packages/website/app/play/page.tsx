import dynamic from "next/dynamic";

import Loading from "./loading";

const Client = dynamic(() => import("./client").then((mod) => mod.Client), {
  ssr: false,
  loading: Loading,
});

export default async function Page() {
  return <Client />;
}
