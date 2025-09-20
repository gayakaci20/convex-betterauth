import { nextJsHandler } from "@convex-dev/better-auth/nextjs";

const { GET, POST } = nextJsHandler({
    convexSiteUrl: process.env.NEXT_PUBLIC_CONVEX_SITE_URL!,
});

export { GET, POST };
