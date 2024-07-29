export interface UserTrack {
  id: number;
  title: string;
  artist: string[];
  album: string[];
  year: number;
  genre: string[];
  duration: number;
  cover?: string;
}
