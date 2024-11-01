const nextConfig = {
  basePath: "/ipms-landing",
  output: "export",  // <=== enables static exports
  transpilePackages: ["@radix-ui/react-dialog", "@radix-ui/react-label", "@radix-ui/react-slot"],
  reactStrictMode: true,
  webpack: (config, { dev }) => {
    config.module.rules.push({
      test: /\.json$/,
      type: 'json',
    })

    if (dev) {
      config.cache = false
    }

    return config
  },
}

module.exports = nextConfig