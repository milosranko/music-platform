import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { v4 as uuidv4 } from 'uuid';
import { UserData } from '../interfaces/UserData';

export interface UserState {
  isLoggedIn: boolean;
  userName?: string;
  isLoading: boolean;
  userData: UserData;
  accessToken: string;
};

const initialState: UserState = {
  isLoggedIn: false,
  isLoading: false,
  userData: {} as UserData,
  accessToken: '',
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    async login(login: string, password: string): Promise<boolean> {
        /** Fake */
        const loginResponse = await fetch('/api/login', { 
          method: 'POST', 
          body: JSON.stringify({login, password}) 
        });

        if (loginResponse.status !== 200) {
            return false;
        }

        const {userData, accessToken} = await loginResponse.json();

        patchState(store, { userData, accessToken, isLoggedIn: true });

        return true;
    },
    async logout(): Promise<void> {
        /** Fake */
        patchState(store, { isLoggedIn: false, userData: undefined, accessToken: undefined });
    },
    async createUser(params: any): Promise<void> {
      patchState(store, { isLoading: true });
      const createUserResponse = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({...params, key: uuidv4()}),
      });
      const userData = await createUserResponse.json();
      patchState(store, { 
        userName: userData?.userName, 
        isLoggedIn: true, 
        isLoading: false 
      });
    }
  }))
);