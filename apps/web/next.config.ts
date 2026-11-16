import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // On Vercel, /api is routed to the server service. This proxy is only for `next dev`.
    if (process.env.VERCEL) return [];
    const origin = process.env.LYRA_API_ORIGIN ?? "http://127.0.0.1:4020";
    return [{ source: "/api/:path*", destination: `${origin}/:path*` }];
  },
};

export default nextConfig;
