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
    tracks: [], 
};

const mapTrack = (track: any): UserTrack => ({
  id: track._id,
  title: track.Name,
  artists: track.Artists,
  genres: track.Genres,
  url: track.Url,
  cover: track.Cover,
});

export const UserTracksStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, userStore = inject(UserStore), saasApiService = inject(SaasApiService)) => ({
    async addTrack(track: UserTrack) {
      const {artistPageId} = userStore.userData();
      const id = uuidv4();
      const createResponse = await saasApiService.createTrack({...track, id, artistPageId});
      console.log(createResponse);
    },
    async getTracks() {
      const {artistPageId} = userStore.userData();
      const {tracks} = await saasApiService.getTracks(artistPageId);
      if (tracks?.length) {
        patchState(store, {tracks: tracks.map(mapTrack)});
      }

      console.log(tracks);
    }
  }))
);