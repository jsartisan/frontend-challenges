import { PropsWithChildren } from "react";

import { Header } from "~/widgets/Header";
import { Footer } from "~/widgets/Footer";

export default function Layout(props: PropsWithChildren) {
  const { children } = props;

  return (
    <>
      <Header />
      <main className="h-full grow">
        <div className="max-w-(--breakpoint-xl) mx-auto px-4 py-8 sm:px-6 md:py-12">{children}</div>
      </main>
      <Footer />
    </>
  );
}
