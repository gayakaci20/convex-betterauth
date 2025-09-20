import { createAuthClient } from "better-auth/react";
import { convexClient } from "@convex-dev/better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? `${window.location.origin}/api/auth` : process.env.NEXT_PUBLIC_CONVEX_SITE_URL!,
  plugins: [convexClient()],
});