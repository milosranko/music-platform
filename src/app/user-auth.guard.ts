import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserStore } from './stores/user.store';

export const userAuthGuard: CanActivateFn = (route, state) => {
  const userStore = inject(UserStore);
  return userStore.isLoggedIn();
};
