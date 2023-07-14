/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
      },
}

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI


module.exports = nextConfig
