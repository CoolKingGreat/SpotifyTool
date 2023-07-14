type Props = {
  likedSongsData: LikedSongsData[];
};

export default function SavedTracksDisplay({ likedSongsData }: Props) {
  let content;
  if (likedSongsData) {
    console.log("lsd " + likedSongsData);
    content = likedSongsData.map((song) => {
      return <p key={song.track.id}>{song.track.name} | {song.track.id}</p>;
    });
  }
  return content || <p>No data</p>;
}
