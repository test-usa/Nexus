import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "sonner";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import routes from "./routes/Routes";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
const queryClient = new QueryClient();
const googleClientId = import.meta.env.VITE_GOOGLE_AUTH_ID;
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={googleClientId}>
        <RouterProvider router={routes} />
      </GoogleOAuthProvider>
    </QueryClientProvider>
    <Toaster position="top-right" />
  </React.StrictMode>
);
