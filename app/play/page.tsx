import dynamic from "next/dynamic";
import { Loading } from "./Loading";

const Client = dynamic(() => import("./client"), {
  ssr: false,
  loading: Loading,
});

export default async function Page() {
  return <Client />;
}
