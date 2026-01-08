import { PropsWithChildren } from "react";

import { Header } from "~/widgets/Header";

export default function ThreadLayout(props: PropsWithChildren) {
  const { children } = props;

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex h-full grow flex-col">{children}</main>
    </div>
  );
}
