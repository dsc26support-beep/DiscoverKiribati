import type { NextConfig } from "next";

/**
 * Static export configuration for Cloudflare Pages.
 *
 * `output: "export"` produces a fully static site in the `out/` directory —
 * no Node.js server is required at runtime. This is required because
 * Cloudflare Pages (as configured for this project) serves static files.
 *
 * Do not add server-only features (API routes with dynamic handlers,
 * middleware, server actions that require a server) without first changing
 * this to a Cloudflare Workers-based deployment — see README.md "Hosting
 * architecture" for why.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Static export cannot use the Next.js image optimization server.
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
