// /** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config")

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  i18n,
  typescript: {
    ignoreBuildErrors: false,
  },
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    return {
      ...config,
      "resolve": {
        ...config.resolve,
        "fallback": {
          ...config.resolve.fallback,
          "fs": false
        }
      }
    }
  }
})
