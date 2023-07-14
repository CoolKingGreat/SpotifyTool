"use server";


async function getSegment(
  access_token: string,
  limit: number,
  offset: number = 0
) {
  let response = await fetch(
    "https://api.spotify.com/v1/me/tracks?" +
      new URLSearchParams({
        limit: `${limit}`,
        offset: `${offset}`,
      }).toString(),
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return response.json();
}

export default async function getSavedTracks(access_token: string) {
  let total = (await getSegment(access_token, 50, 0)).total;
  let offsetCount = 0;
  let totalPromises: Promise<SavedTrackResponse>[] = [];
  while (offsetCount < total) {
    totalPromises.push(getSegment(access_token, 50, offsetCount));
    offsetCount += 50;
  }
  let savedTracks = (await Promise.all(totalPromises)).map((dataSegment) => {
    return dataSegment.items;
  });
  return savedTracks.flat();
}
