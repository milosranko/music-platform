import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { UserTrack } from '../interfaces/UserTrack';

export interface HomeTracksState {
  pageHeader: string;
  tracks: UserTrack[];
}

const initialState: HomeTracksState = {
  pageHeader: '',
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
    {
      id: 3,
      title: 'Some Other Track',
      artist: ['Somebody Else'],
      album: ['Some Other Album'],
      year: 1998,
      genre: ['Rap', 'Trap'],
      duration: 300,
      cover:
        'https://upload.wikimedia.org/wikipedia/ru/7/7e/Revenge_Single_Cover.jpg',
    },
    {
      id: 4,
      title: 'Some Other Track',
      artist: ['Somebody Else'],
      album: ['Some Other Album'],
      year: 1998,
      genre: ['Rap', 'Trap'],
      duration: 300,
      cover:
        'https://upload.wikimedia.org/wikipedia/en/f/f7/XXXTentacion_%E2%80%93_Skins.png',
    },
    {
      id: 5,
      title: 'Some Other Track',
      artist: ['Somebody Else'],
      album: ['Some Other Album'],
      year: 1998,
      genre: ['Rap', 'Trap'],
      duration: 300,
      cover:
        'https://upload.wikimedia.org/wikipedia/en/5/56/Bad_vibes_forever_xxxtentacion.jpg',
    },
  ],
};

export const HomeTracksStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    /** TODO: api calls */
    async loadStartPage(): Promise<void> {
      const homepageResponse = await fetch('/api/homepage');
      const homepage = await homepageResponse.json();
      patchState(store, { pageHeader: homepage.StartPage.items[0].Heading });
    },
  }))
);
