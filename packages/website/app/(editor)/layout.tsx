import { PropsWithChildren } from "react";

import { Header } from "~/components/layout/Header";

export default async function DefaultLayoutWrapper(props: PropsWithChildren) {
  const { children } = props;

  return (
    <>
      <Header />
      {children}
    </>
  );
}
