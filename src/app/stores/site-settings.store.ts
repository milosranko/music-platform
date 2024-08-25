import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

type XHTMLString = { html: string };

export interface SiteSettingsState {
  heading: string;
  footerHtml: XHTMLString;
  isLoading: boolean;
};

const initialState: SiteSettingsState = {
  heading: '',
  footerHtml: { html: '' },
  isLoading: false,
};

export const SiteSettingsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ footerHtml }) => ({
    /** Put Sanitization here */
    footerHtmlSafe: computed(() => footerHtml()?.html),
  })),
  withMethods((store) => ({
    async loadAll(): Promise<void> {
      patchState(store, { isLoading: true });
      const startPageResponse = await fetch('/api/startpage');
      const startPage = await startPageResponse.json();
      patchState(store, { 
        heading: startPage?.StartPage?.items?.[0]?.Heading, 
        footerHtml: startPage?.StartPage?.items?.[0]?.FooterText, 
        isLoading: false 
      });
    },
    async setLoading(isLoading: boolean): Promise<void> {
      patchState(store, { isLoading });
    }
  }))
);