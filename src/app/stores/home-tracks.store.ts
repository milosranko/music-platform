import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { UserTrack } from '../interfaces/UserTrack';
import { SaasApiService } from '../services/saas-api.service';
import { SiteSettingsStore } from './site-settings.store';

export interface HomeTracksState {
  tracks: UserTrack[];
};

const initialState: HomeTracksState = {
    tracks: [], 
};

const mapTrack = (track: any): UserTrack => ({
  id: track._id,
  title: track.Name,
  artists: track.Artists,
  genres: track.Genres,
  url: track.Url,
  cover: track.Cover,
  promo: track.Promo,
});

export const HomeTracksStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, saasApiService = inject(SaasApiService), siteSettingsStore = inject(SiteSettingsStore)) => ({
    async getTracks() {
      siteSettingsStore.setLoading(true);
      const {tracks} = await saasApiService.getAllTracks().finally(() => {
        siteSettingsStore.setLoading(false);
      });
      if (tracks?.length) {
        patchState(store, {tracks: tracks.map(mapTrack)});
      }
    }
  }))
);