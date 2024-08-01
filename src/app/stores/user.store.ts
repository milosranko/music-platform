import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export interface UserState {
  isLoggedIn: boolean;
  userName?: string;
  isLoading: boolean;
};

const initialState: UserState = {
  isLoggedIn: false,
  isLoading: false,
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    async login(): Promise<void> {
        /** Fake */
        patchState(store, { isLoggedIn: true });
    },
    async logout(): Promise<void> {
        /** Fake */
        patchState(store, { isLoggedIn: false });
    },
    async createUser(params: any): Promise<void> {
      patchState(store, { isLoading: true });
      const createUserResponse = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify(params),
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