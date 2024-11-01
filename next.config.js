const nextConfig = {
  output: 'export',  // for static export
  basePath: '/ipms-landing',  // matches your deployment subdirectory
  assetPrefix: '/ipms-landing/',  // helps with asset loading

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