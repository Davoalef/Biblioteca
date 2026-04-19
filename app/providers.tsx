"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  // useState asegura que el QueryClient se cree una sola vez por sesión
  // (si lo pones como constante fuera del componente, se comparte entre usuarios en SSR)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minuto antes de considerar datos "viejos"
            refetchOnWindowFocus: false, // no refetchear al volver a la pestaña
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}