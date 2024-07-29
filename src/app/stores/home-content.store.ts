import { signalStore, withMethods, withState } from '@ngrx/signals';
import { UserTrack } from '../interfaces/UserTrack';

export interface HomeTracksState {
  tracks: UserTrack[];
}

const initialState: HomeTracksState = {
  tracks: [
    {
      id: 1,
      title: 'Some Track',
      artist: ['Somebody'],
      album: ['Some Album'],
      year: 1997,
      genre: ['Rap', 'Trap'],
      duration: 300,
      cover:
        'https://upload.wikimedia.org/wikipedia/en/4/41/17_XXXTENTACION_Cover.png',
    },
    {
      id: 2,
      title: 'Some Other Track',
      artist: ['Somebody Else'],
      album: ['Some Other Album'],
      year: 1998,
      genre: ['Rap', 'Trap'],
      duration: 300,
      cover:
        'https://upload.wikimedia.org/wikipedia/en/2/21/%3F_XXXTENTACION_Cover.png',
    },
  ],
};

export const HomeTracksStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    /** TODO: api calls */
  }))
);
