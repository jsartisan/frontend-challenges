import { PropsWithChildren } from "react";

export default function Layout(props: PropsWithChildren) {
  const { children } = props;

  return <main className="h-full grow">{children}</main>;
}
