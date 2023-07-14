import { useState } from "react";

type Props = {
  playlistTracksData: {
    playlists: PlaylistData[];
    playlist_tracks: {
      [k: string]: PlaylistTrackData[];
    };
  };
  likedSongsData: LikedSongsData[];
};

export default function UnaddedSongsDisplay({
  playlistTracksData,
  likedSongsData,
}: Props) {
  let playlistTracksIDs: string[] = [];

  const sortTypes: string[] = ["Date Added", "Artist", "Song Title"];
  const [sortType, setSortType] = useState("Date Added");

  if (!playlistTracksData || !likedSongsData) {
    return <p>No content</p>;
  }

  for (let key in playlistTracksData.playlist_tracks) {
    playlistTracksData.playlist_tracks[key].map((song) => {
      playlistTracksIDs.push(song.track.id);
    });
  }

  const toggleSort = () => {
    setSortType(
      sortTypes[(sortTypes.indexOf(sortType) + 1) % sortTypes.length]
    );
  };

  if (sortType == "Date Added") {
    likedSongsData.sort((a, b) => (a.added_at < b.added_at ? 1 : -1));
  } else if (sortType == "Artist") {
    likedSongsData.sort((a, b) =>
      a.track.artists[0].name.toLowerCase() >
      b.track.artists[0].name.toLowerCase()
        ? 1
        : -1
    );
  } else if (sortType == "Song Title") {
    likedSongsData.sort((a, b) =>
      a.track.name.toLowerCase() > b.track.name.toLowerCase() ? 1 : -1
    );
  }

  return (
    <div className="px-4 py-6">
      <div className="flex justify-end mb-4 items-end flex-col">
        <button
          onClick={toggleSort}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-semibold mb-2"
        >
          {`Sort by ${
            sortTypes[(sortTypes.indexOf(sortType) + 1) % sortTypes.length]
          }`}
        </button>
        <div className="text-gray-500 text-sm">
          Currently Sorted By: {sortType}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {likedSongsData.map((likedSong) =>
          !playlistTracksIDs.includes(likedSong.track.id) &&
          !likedSong.track.explicit ? ( //EXPLICIT SONGS ARE NOT DISPLAYED
            <div
              key={likedSong.track.id}
              className="bg-gray-100 text-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg flex flex-col justify-between overflow-hidden"
            >
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-2xl font-bold mb-2 line-clamp-2">
                    {likedSong.track.name}
                  </h2>
                  <p className="text-gray-600 text-sm mb-1 line-clamp-1">
                    <span className="font-bold">Artist(s):</span>{" "}
                    {likedSong.track.artists.map(({ name }) => name).join(", ")}
                  </p>
                  <p className="text-gray-600 text-sm line-clamp-1">
                    <span className="font-bold">Album:</span>{" "}
                    {likedSong.track.album.name}
                  </p>
                </div>
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
