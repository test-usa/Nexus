import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "sonner";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import routes from "./routes/Routes";
import { HeroUIProvider } from "@heroui/system";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>
        <main className="h-full bg-[#212020]">
          <RouterProvider router={routes} />
        </main>
      </HeroUIProvider>
    </QueryClientProvider>
    <Toaster position="bottom-center" richColors />
  </React.StrictMode>
);
