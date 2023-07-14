"use server"

export default async function getRefreshToken(code: string) {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: `${process.env.SPOTIFY_REDIRECT_URI}`
    }),
  });
  let refresh_token = (await response.json()).refresh_token
  return {refresh_token: refresh_token}
}