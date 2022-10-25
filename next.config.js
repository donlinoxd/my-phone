/** @type {import('next').NextConfig} */
const nextConfig = {
    // in production reactStrictMode is set to false by default. Set to false if you want to stop useEffect for running twice in development.
    reactStrictMode: true, // default true
    swcMinify: true,
    env: {
        server_uri: process.env.NEXT_PUBLIC_SERVER_URI,
    },
    images: {
        domains: ['assets.vercel.com', 'www.freeiconspng.com', 'res.cloudinary.com'],
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 5000 * 60,
    },
}

module.exports = nextConfig
