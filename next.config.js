/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        // 'blueteamlabs.online', /* other domains */
        {
          protocol: "https",
          hostname: "blueteamlabs.online",
        },
    ],
      },
}

module.exports = nextConfig
