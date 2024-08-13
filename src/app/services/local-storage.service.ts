import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  storeAuthData(userId: string) {
    localStorage.setItem('userId', userId);
  }

  clearAuthData() {
    localStorage.removeItem('userId');
  }

  getAuthData() {
    return {
      userId: localStorage.getItem('userId')
    }
  }
}
