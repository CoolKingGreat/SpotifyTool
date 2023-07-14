type Props = {
  playlistTracksData: PlaylistTrackData[];
};

export default function PlaylistTracksData({ playlistTracksData }: Props) {
  let content;
  if (playlistTracksData) {
    console.log("ptd " + playlistTracksData);
    content = playlistTracksData.map((song) => {
      console.log("song " + song.track);
      if (song.track) {
        return <p key={song.track.id}>---{song.track.name}</p>;
      }
    });
  }
  return content || <p>No data</p>;
}
