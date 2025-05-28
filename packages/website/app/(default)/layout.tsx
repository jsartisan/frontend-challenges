import { PropsWithChildren } from "react";

import { Header } from "~/components/layout/Header";
import { Footer } from "~/components/layout/Footer";

export default async function DefaultLayoutWrapper(props: PropsWithChildren) {
  const { children } = props;

  return (
    <>
      <Header />
      <main className="h-full grow">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 md:py-12">{children}</div>
      </main>
      <Footer />
    </>
  );
}
