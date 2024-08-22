import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { UserTrack } from '../interfaces/UserTrack';
import { UserStore } from './user.store';
import { v4 as uuidv4 } from 'uuid';
import { SaasApiService } from '../services/saas-api.service';

export interface UserTracksState {
  tracks: UserTrack[];
};

const initialState: UserTracksState = {
    tracks: [
      {
        id: '1',
        title: 'Some Track',
        artists: ['Somebody'],
        album: ['Some Album'],
        genres: ['Jazz', 'Bibop', 'Fusion'],
        duration: 300
      },
      {
        id: '2',
        title: 'Some Other Track',
        artists: ['Somebody Else'],
        album: ['Some Other Album'],
        genres: ['Jazz', 'Bibop', 'Fusion'],
        duration: 300
      }
    ], 
};

export const UserTracksStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, userStore = inject(UserStore), saasApiService = inject(SaasApiService)) => ({
    /** TODO: api calls */
    async addTrack(track: UserTrack) {
      const {artistPageId} = userStore.userData();
      const id = uuidv4();
      const createResponse = await saasApiService.createTrack({...track, id, artistPageId});
      console.log(createResponse);
    },
  }))
);