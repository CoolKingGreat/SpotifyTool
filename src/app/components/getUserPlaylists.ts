"use server";

import getPlaylistTracks from "./getPlaylistTracks";

async function getSegment(
  access_token: string,
  limit: number,
  offset: number = 0
) {
  let response = await fetch(
    "https://api.spotify.com/v1/me/playlists?" +
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

export default async function getUserPlaylists(
  access_token: string,
  uri: string
) {
  let total = (await getSegment(access_token, 50, 0)).total;
  let offsetCount = 0;
  let totalPromises: Promise<SavedPlaylistsResponse>[] = [];
  let playlistTrackMapPromises = new Map<
    string,
    Promise<PlaylistTrackData[][]>
  >();
  
  let playlistTrackMap = new Map<string, PlaylistTrackData[]>();

  while (offsetCount < total) {
    totalPromises.push(getSegment(access_token, 50, offsetCount));
    offsetCount += 50;
  }

  let userPlaylists = (await Promise.all(totalPromises))
    .flatMap((dataSegment) => dataSegment.items)
    .filter((playlist) => playlist.owner.uri === uri);

  userPlaylists.forEach((playlist) => {
    let playlistTrackInfo = getPlaylistTracks(access_token, playlist.id);
    playlistTrackMapPromises.set(playlist.id, playlistTrackInfo);
  });

  for (const [key, promise] of playlistTrackMapPromises.entries()) {
    const resolvedValue = await promise;
    playlistTrackMap.set(key, resolvedValue.flat());
  }
  let playlistTrackMapObj = Object.fromEntries(playlistTrackMap);
  return {
    playlists: userPlaylists,
    playlist_tracks: playlistTrackMapObj,
  };
}