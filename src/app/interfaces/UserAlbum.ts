import { UserTrack } from "./UserTrack";

export interface UserAlbum {
    id: string;
    title: string;
    artist: string[];
    year: number;
    genre: string[];
    tracks: UserTrack[];
    promoText: string;
    cover: string; // url?
}