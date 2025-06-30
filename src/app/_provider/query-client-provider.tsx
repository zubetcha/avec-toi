"use client";

import { QueryClient, QueryClientProvider as BaseQueryClientProvider } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

export default function QueryClientProvider({ children }: { children: React.ReactNode }) {
  const isBrowser = typeof window !== "undefined";

  if (!isBrowser) {
    // SSR 단계에서는 persister 없이 기본 Provider만 사용
    return <BaseQueryClientProvider client={queryClient}>{children}</BaseQueryClientProvider>;
  }

  const persister = createAsyncStoragePersister({
    storage: window.localStorage,
  });

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  );
}
