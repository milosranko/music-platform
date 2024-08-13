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
}
