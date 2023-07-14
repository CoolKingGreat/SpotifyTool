  import PlaylistTracksDisplay from "./PlaylistTracksDisplay";

  type Props = {
    userPlaylistData: {
      playlists: PlaylistData[];
      playlist_tracks: {
      [k: string]: PlaylistTrackData[];
  }
  };
    userURI: string;
  };

  export default function UserPlaylistNamesDisplay({
    userPlaylistData,
    userURI,
  }: Props) {
    let content;
    if (userPlaylistData) {
      console.log("upd " + userPlaylistData.playlist_tracks);
      content = userPlaylistData.playlists.map((playlist) => {
          if(userPlaylistData.playlist_tracks){
            return (
              <>
                <p key={playlist.id}>
                  {playlist.name} | {playlist.id} | {playlist.tracks.total} songs
                </p>
                <PlaylistTracksDisplay playlistTracksData={userPlaylistData.playlist_tracks[playlist.id]}/>
              </>
            );
          } else {
            return (
              <>
                <p key={playlist.id}>
                  {playlist.name} | {playlist.id} | {playlist.tracks.total} songs
                </p>
              </>
            );
          }
      });
    }
    return content || <p>No data</p>;
  }
