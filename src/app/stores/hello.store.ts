import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export interface HelloState {
  hello: string;
  isLoading: boolean;
};

const initialState: HelloState = {
  hello: 'Test',
  isLoading: false,
};

export const HelloStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    async loadAll(): Promise<void> {
      patchState(store, { isLoading: true });
      const helloResponse = await fetch('/api/hello');
      const hello = await helloResponse.text();
      patchState(store, { hello, isLoading: false });
    },
  }))
);