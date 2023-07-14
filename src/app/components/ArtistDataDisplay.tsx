type Props = {
  artistData: ArtistData[];
};

export default function ArtistDataDisplay({ artistData }: Props) {
  let content;
  if (artistData) {
    content = artistData.map((artist) => {
      return <p key={artist.id}>{artist.name}</p>;
    });
  }
  return content || <p>No data</p>;
}
