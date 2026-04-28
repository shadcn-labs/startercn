import { createMDX } from "fumadocs-mdx/next";

import { LINK } from "./constants/links";
import { ROUTES } from "./constants/routes";

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  experimental: {
    viewTransition: true,
  },
  headers() {
    const link = [
      '</.well-known/api-catalog>; rel="api-catalog"',
      '</openapi.json>; rel="service-desc"',
      '</docs>; rel="service-doc"',
      `<${LINK.SHADCN_MCP_DOCS}>; rel="service-doc"; title="shadcn MCP server"`,
      '</.well-known/agent-skills/index.json>; rel="describedby"',
    ].join(", ");

    return [{ headers: [{ key: "Link", value: link }], source: ROUTES.HOME }];
  },
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
        protocol: "https",
      },
      {
        hostname: "images.unsplash.com",
        protocol: "https",
      },
    ],
  },
  outputFileTracingIncludes: {
    "/*": ["./registry/**/*"],
  },
  redirects() {
    return [
      {
        destination: "/docs/:path*.md",
        permanent: true,
        source: "/docs/:path*.mdx",
      },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
