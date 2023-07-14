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
    <>
      <h1 className="text-3xl font-bold underline">Hello</h1>
      <p>hello</p>
      <Link href={(getSpotifyAuth())}>This is a link to an external website</Link>
    </>
  )
}
