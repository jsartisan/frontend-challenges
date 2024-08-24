import dynamic from "next/dynamic";

import Loading from "./loading";

const Client = dynamic(() => import("./client"), {
  ssr: false,
  loading: Loading,
});

export const metadata = {
  title: "Submit",
  description: "Submit a new quiz",
};

export default function Page() {
  return <Client />;
}
