import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserTrack } from '../interfaces/UserTrack';
import { UserData } from '../interfaces/UserData';

@Injectable({
  providedIn: 'root'
})
export class OpenAiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  generateTrackCover = (user: UserData, track: UserTrack): Observable<GenerateTrackCoverResponse> => {
    return this.httpClient.post<GenerateTrackCoverResponse>('/api/openai/trackcover', {
      artistName: user.Name,
      trackName: track.title,
      genre: track.genres
    });
  }

  generateTrackPromo = (user: UserData, track: UserTrack): Observable<GenerateTrackPromoResponse> => {
    return this.httpClient.post<GenerateTrackPromoResponse>('/api/openai/trackpromo', {
      artistName: user.Name,
      trackName: track.title,
      genres: track.genres
    });
  };
}

export interface GenerateTrackCoverResponse {
  url: string;
};


export interface GenerateTrackPromoResponse {
  description: string;
};
