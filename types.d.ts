type ArtistData = {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
};

type PlaylistData = {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  primary_color: null;
  public: boolean;
  snapshot_id: string;
  tracks: Tracks;
  type: string;
  uri: string;
};

type Owner = {
  display_name: string;
  external_urls: ExternalUrls;
  href: string;
  id: ID;
  type: string;
  uri: string;
};

type Tracks = {
  href: string;
  total: number;
};

type ExternalUrls = {
  spotify: string;
};

type Followers = {
  href: null;
  total: number;
};

type Image = {
  height: number;
  url: string;
  width: number;
};

type LikedSongsData = {
  added_at: string;
  track: Track;
};

type SavedTrackResponse = {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: LikedSongsData[];
};

type SavedPlaylistsResponse = {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: PlaylistData[];
};

type Track = {
  album: Album;
  artists: TrackArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: string;
  restrictions: Restrictions;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
};

type Album = {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: Restrictions;
  type: string;
  uri: string;
  copyrights: Copyright[];
  external_ids: ExternalIDS;
  genres: string[];
  label: string;
  popularity: number;
  album_group: string;
  artists: AlbumArtist[];
};

type AlbumArtist = {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

type ExternalUrls = {
  spotify: string;
};

type Copyright = {
  text: string;
  type: string;
};

type ExternalIDS = {
  isrc: string;
  ean: string;
  upc: string;
};

type Image = {
  url: string;
  height: number;
  width: number;
};

type Restrictions = {
  reason: string;
};

type TrackArtist = {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
};

type Followers = {
  href: string;
  total: number;
};

type PlaylistsTracksResponse = {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: PlaylistTrackData[];
};

type PlaylistTrackData = {
  added_at: string;
  added_by: AddedBy;
  is_local: boolean;
  primary_color: null;
  track: Track;
  video_thumbnail: VideoThumbnail;
};

type AddedBy = {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
};

type VideoThumbnail = {
  url: null;
};
