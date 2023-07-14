"use server";

export default async function getUserURI(access_token: string) {
  const response = await fetch(
    "https://api.spotify.com/v1/me",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  const { uri } = await response.json();
  return uri;
}
