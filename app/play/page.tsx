import { Suspense } from "react";
import Client from "./client";

export default async function Page() {
  return (
    <Suspense>
      <Client />
    </Suspense>
  );
}
