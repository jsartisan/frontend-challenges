import { Suspense } from "react";
import Client from "./client";

export const metadata = {
  title: "Submit",
  description: "Submit a new link",
};

export default function Page() {
  return (
    <Suspense>
      <Client />
    </Suspense>
  );
}
