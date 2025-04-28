// app/providers.tsx
"use client";

import { HeroUIProvider } from "@heroui/react";
import { Provider } from "react-redux";
import { store } from "./store";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useRouter } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();
  return (
    <Provider store={store}>
      <HeroUIProvider navigate={router.push}>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </HeroUIProvider>
    </Provider>
  );
}
