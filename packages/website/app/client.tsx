"use client";

import { useSyncScopeToSessionStorage } from "../hooks";

type ClientProps = {
  children: React.ReactNode;
};

export function Client(props: ClientProps) {
  const { children } = props;

  useSyncScopeToSessionStorage("all");

  return <>{children}</>;
}
