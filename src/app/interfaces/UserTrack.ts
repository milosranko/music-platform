export interface UserTrack {
  id?: string; // Artist Track page _id
  title: string;
  artists: string[];
  album: string[];
  genres: string[];
  duration: number;
  image?: string;
  url?: string;
}
