"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import getTokens from "../components/getTokens";
import { useEffect, Suspense, useState } from "react";
import getTopArtists from "../components/getTopArtists";
import getSavedTracks from "../components/getSavedTracks";
import ArtistDataDisplay from "../components/ArtistDataDisplay";
import SavedTracksDisplay from "../components/SavedTracksDisplay";
import getUserPlaylists from "../components/getUserPlaylists";
import UserPlaylistNamesDisplay from "../components/UserPlaylistNamesDisplay";
import getUserURI from "../components/getUserURI";
import UnaddedSongsDisplay from "../components/UnaddedSongsDisplay";
import PlaylistTracksData from "../components/PlaylistTracksDisplay";

export default function Callback() {
  const searchParams = useSearchParams();
  let code = searchParams.get("code");
  const [refreshToken, setRefreshTokens] = useState("None");
  const [accessToken, setAccessToken] = useState("None");
  const [artistData, setArtistData] = useState();
  const [userURI, setUserURI] = useState<string | null>();
  const [savedTracksData, setSavedTracksData] = useState<
    LikedSongsData[] | null
  >();

  const [userPlaylistData, setUserPlaylistData] = useState<{
    playlists: PlaylistData[];
    playlist_tracks: {
      [k: string]: PlaylistTrackData[];
    };
  } | null>();

  useEffect(() => {
    async function setTokenData() {
      let tokens = await getTokens(code as string);
      setRefreshTokens(tokens.refresh_token);
      setAccessToken(tokens.access_token);
    }
    setTokenData();
  }, []);

  useEffect(() => {
    async function getUserURIData() {
      setUserURI(await getUserURI(accessToken));
    }
    async function getArtistData() {
      setArtistData(await getTopArtists(accessToken));
    }
    async function getSavedTracksData() {
      setSavedTracksData(await getSavedTracks(accessToken));
    }
    if (accessToken) {
      getUserURIData();
      getArtistData();
      getSavedTracksData();
    }
  }, [accessToken]);

  useEffect(() => {
    async function getUserPlaylistData() {
      setUserPlaylistData(await getUserPlaylists(accessToken, userURI!));
    }
    if (userURI) {
      getUserPlaylistData();
    }
  }, [userURI]);

  return (
    <>
      <h1 className="text-2xl font-bold text-center my-8">
        Liked Songs Not Added to a Playlist
      </h1>
      {/* <h1 className="text-3xl font-bold underline">Hello</h1>
      <p>hello</p>
      <p>Refresh Token: {refreshToken}</p>
      <p>Access Token: {accessToken}</p>
      <Suspense fallback={<p>Loading...</p>}>
        <ArtistDataDisplay artistData={artistData!} />
      </Suspense>
      <Suspense fallback={<p>Loading...</p>}>
        <SavedTracksDisplay likedSongsData={savedTracksData!} />
      </Suspense>
      <Suspense fallback={<p>Loading...</p>}>
        <UserPlaylistNamesDisplay
          userPlaylistData={userPlaylistData!}
          userURI={userURI!}
        />
      </Suspense> */}
      <Suspense fallback={<p>Loading...</p>}>
        <UnaddedSongsDisplay
          likedSongsData={savedTracksData!}
          playlistTracksData={userPlaylistData!}
        />
      </Suspense>
    </>
  );
}
