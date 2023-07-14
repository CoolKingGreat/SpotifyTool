"use server";

export default async function getTopArtists(access_token: string) {
  const response = await fetch(
    "https://api.spotify.com/v1/me/top/artists?" +
      new URLSearchParams({ limit: "5" }).toString(),
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  const { items } = await response.json();
  return items;
}
