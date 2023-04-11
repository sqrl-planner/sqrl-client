/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config")

const nextConfig = {
  reactStrictMode: true,
  i18n,
  async redirects() {
    return [
      {
        source: "/shop",
        destination: "https://shop.sqrl.sh",
        permanent: true,
      },
      {
        source: "/github",
        destination: "https://github.com/sqrl-planner",
        permanent: true,
      },
      {
        source: "/discord",
        destination: "https://discord.gg/eBkevksYJh",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
