import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/shared/i18n/request.ts");

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.glsl": {
        type: "raw",
      },
    },
  },
  webpack: (config: { module: { rules: unknown[] } }) => {
    config.module.rules.push({
      test: /\.glsl$/,
      type: "asset/source",
    });
    return config;
  },
};

export default withNextIntl(nextConfig);
