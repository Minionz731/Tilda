import type { NextConfig } from "next";

const LIVE_ORIGIN = process.env.LIVE_ORIGIN ?? "https://tildabelshaven.com.ng";
const live = new URL(LIVE_ORIGIN);

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [480, 640, 828, 1080, 1280, 1600, 1920, 2400],
    // Photos uploaded to the live API after this build fall back to the live host.
    remotePatterns: [{ protocol: live.protocol.replace(":", "") as "https" | "http", hostname: live.hostname, pathname: "/images/**" }],
  },
  // Accounts, the post-booking dashboard and payment live on the existing backend.
  // Keep the original URLs working by handing them over (query strings are preserved).
  async redirects() {
    return ["/login", "/register", "/dashboard", "/dashboard/:path*"].map((source) => ({
      source,
      destination: `${LIVE_ORIGIN}${source}`,
      permanent: false,
    }));
  },
};

export default nextConfig;
