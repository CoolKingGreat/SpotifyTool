"use server"

export default async function getAccessToken(refresh_token: string) {
  
    const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    }),
  });

  let access_token = (await response.json()).access_token;
  return { access_token: access_token };
}
