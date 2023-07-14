"use server";


async function getSegment(
  access_token: string,
  id: string,
  limit: number,
  offset: number = 0
) {
  let response = await fetch(
    `https://api.spotify.com/v1/playlists/${id}/tracks?` +
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

export default async function getPlaylistTracks(access_token: string, id: string) {
  let total = (await getSegment(access_token, id, 50, 0)).total;
  let offsetCount = 0;
  let totalPromises: Promise<PlaylistsTracksResponse>[] = [];
  while (offsetCount < total) {
    totalPromises.push(getSegment(access_token, id, 50, offsetCount));
    offsetCount += 50;
  }
  let playlistTracks = (await Promise.all(totalPromises)).map((dataSegment) => {
    return dataSegment.items;
  });
  return playlistTracks;
}
