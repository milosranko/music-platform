import { Injectable } from '@angular/core';
import { UserData } from '../interfaces/UserData';

@Injectable({
  providedIn: 'root'
})
export class SaasApiService {

  constructor() { }

  getArtistPageData(userId: string): Promise<{userData: UserData}> {
    return fetch(`/api/artist`, {
      method: 'POST',
      body: JSON.stringify({userId})
    }).then(res => {
      return res.json();
    });
  }

  createTrack(track: any): Promise<any> {
    return fetch(`/api/track`, {
      method: 'POST',
      body: JSON.stringify(track)
    }).then(res => {
      return res.json();
    });
  }

  getTracks(artistPageId: string): Promise<any> {
    return fetch(`/api/user-tracks`, {
      method: 'POST',
      body: JSON.stringify({artistPageId})
    }).then(res => {
      return res.json();
    });
  }
}
