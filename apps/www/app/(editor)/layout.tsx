import { PropsWithChildren } from "react";

import { Header } from "~/widgets/Header";

export default function Layout(props: PropsWithChildren) {
  const { children } = props;

  return (
    <>
      <Header />
      {children}
    </>
  );
}
