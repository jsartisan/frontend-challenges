import dynamic from "next/dynamic";
import Loading from "./loading";

export const metadata = {
  title: "Submit",
  description: "Submit a new link",
};

const Client = dynamic(() => import("./client"), {
  ssr: false,
  loading: Loading,
});

export default function Page() {
  return <Client />;
}
