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
      async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            },
            {
              // matching all API routes
              source: "/:path*",
              headers: [
                  { key: "Access-Control-Allow-Credentials", value: "true" },
                  { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                  { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                  { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
              ]
          }
        ]
    },
    // async rewrites() {
    //   return [
    //     {
    //       source: '/api/socket',
    //       destination: '/api/ws',
    //     },
    //   ];
    // },
}

module.exports = nextConfig
