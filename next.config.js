/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // --- USAREMOS ESTE BLOQUE MODERNO Y MÁS ROBUSTO ---
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig