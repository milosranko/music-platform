import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { UserAlbum } from '../interfaces/UserAlbum';
import { v4 as uuidv4 } from 'uuid';

export interface UserAlbumsState {
  albums: UserAlbum[];
};

const initialState: UserAlbumsState = {
  albums: [
    {
      id: uuidv4(),
      title: 'Some Album',
      artist: ['Somebody'],
      year: 1997,
      genre: ['Jazz', 'Bibop', 'Fusion'],
      tracks: [],
      promoText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc nec ultricies.',
      cover: 'https://cdn.britannica.com/34/235834-050-C5843610/two-different-breeds-of-cats-side-by-side-outdoors-in-the-garden.jpg'
    },
    {
      id: uuidv4(),
      title: 'Some Other Album',
      artist: ['Somebody Else'],
      year: 1998,
      genre: ['Jazz', 'Bibop', 'Fusion'],
      tracks: [],
      promoText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc nec ultricies.',
      cover: 'https://compote.slate.com/images/b4acd613-b4b0-42bd-bdfe-89fc55985608.jpeg?crop=4778%2C3185%2Cx258%2Cy703'
    },
  ], 
};

export const UserAlbumsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    /** TODO: api calls */
  }))
);