import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { UserTrack } from '../interfaces/UserTrack';

export interface UserTracksState {
  tracks: UserTrack[];
};

const initialState: UserTracksState = {
    tracks: [
      {
        id: 1,
        title: 'Some Track',
        artist: ['Somebody'],
        album: ['Some Album'],
        year: 1997,
        genre: ['Jazz', 'Bibop', 'Fusion'],
        duration: 300
      },
      {
        id: 2,
        title: 'Some Other Track',
        artist: ['Somebody Else'],
        album: ['Some Other Album'],
        year: 1998,
        genre: ['Jazz', 'Bibop', 'Fusion'],
        duration: 300
      }
    ], 
};

export const UserTracksStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    /** TODO: api calls */
  }))
);