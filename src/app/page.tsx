"use client"
import Link from "next/link"



export function getSpotifyAuth() {
  const spotify_cli_id = "0920a131bd0e4e3c90f16437cee79f02"
  const spotify_redir_uri = "http://localhost:3000/callback"

  const searchParams = new URLSearchParams({
      response_type: 'code',
      redirect_uri: spotify_redir_uri,
      client_id: spotify_cli_id,
      scope: 'user-top-read user-read-currently-playing user-library-read playlist-read-private user-read-private user-read-email'
  })

  return 'https://accounts.spotify.com/authorize?' + searchParams
}

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-indigo-700 mb-4">
          Spotify Song Organizer Tool
        </h1>
        <p className="text-gray-600 mb-8">
          Organize your Spotify account with ease.
        </p>
        <Link href={(getSpotifyAuth())} className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
            Click to Log Into Spotify
        </Link>
      </div>
    </div>
  );
}