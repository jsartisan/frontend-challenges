"use client";

import { useState } from "react";

import { QueryClient, QueryClientProvider as TQueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { queryClientConfig } from "@/lib/queryClient";

export const QueryClientProvider = ({ children }: React.PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));

  return (
    <TQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </TQueryClientProvider>
  );
};
