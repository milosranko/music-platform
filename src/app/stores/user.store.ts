import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { v4 as uuidv4 } from 'uuid';
import { UserData } from '../interfaces/UserData';
import { LocalStorageService } from '../services/local-storage.service';
import { SaasApiService } from '../services/saas-api.service';

export interface UserState {
  isLoggedIn: boolean;
  isLoading: boolean;
  userData: UserData;
  accessToken: string;
  userId?: string;
};

const initialState: UserState = {
  isLoggedIn: false,
  isLoading: false,
  userData: {} as UserData,
  accessToken: '',
};

export const mapUserData = (userData: any = {}): UserData => ({
  Email: userData.Email,
  Name: userData.Name,
  Tags: [],
  Tracks: [],
  UserName: userData.UserName,
  Description: '',
  artistPageId: userData._id?.replace('_en_Published', '').replace(/-/gi, ''),
});

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, saasApiService = inject(SaasApiService), localStorageService = inject(LocalStorageService)) => ({
    async login(login: string, password: string): Promise<boolean> {

        const loginResponse = await fetch('/api/login', { 
          method: 'POST', 
          body: JSON.stringify({login, password}) 
        });

        if (loginResponse.status !== 200) {
            return false;
        }

        const {userId} = await loginResponse.json();        
        localStorageService.storeAuthData(userId);
        const { userData } = await saasApiService.getArtistPageData(userId);
        console.log(userData);
        patchState(store, { 
          userData: mapUserData(userData), 
          userId, isLoggedIn: true 
        });

        return true;
    },
    async logout(): Promise<boolean> {
      localStorageService.clearAuthData();
      patchState(store, { isLoggedIn: false, userData: undefined, userId: undefined });
      return true;
    },
    async createUser(params: any): Promise<void> {
      patchState(store, { isLoading: true });

      const createUserResponse = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({...params, key: uuidv4()}),
      });

      if (createUserResponse.status !== 200) {
        patchState(store, { 
          isLoading: false 
        });
        return;
      }

      const {
        userId,
      } = await createUserResponse.json();

      localStorageService.storeAuthData(userId);

      const { userData } = await saasApiService.getArtistPageData(userId);

      patchState(store, { 
        isLoading: false,
        userData: mapUserData(userData),
        isLoggedIn: true,
        userId,
      });
    },
    async restoreUser(): Promise<void> {
      const { userId } = localStorageService.getAuthData();

      if (!userId) {
        return;
      }

      const {userData} = await saasApiService.getArtistPageData(userId);

      patchState(store, { 
        userData: mapUserData(userData),
        userId, 
        isLoggedIn: true });
    },
  }))
);