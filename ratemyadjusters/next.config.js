/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
}

module.exports = nextConfig
async redirects() {
  return [
    {
      source: '/how-can-i-review-my-insurance-adjuster',
      destination: '/guides/how-to-review-your-insurance-adjuster',
      permanent: true,
    },
    {
      source: '/review-my-adjuster',
      destination: '/guides/how-to-review-your-insurance-adjuster',
      permanent: true,
    },
    {
      source: '/rate-my-adjuster',
      destination: '/guides/how-to-review-your-insurance-adjuster',
      permanent: true,
    },
  ]
}
