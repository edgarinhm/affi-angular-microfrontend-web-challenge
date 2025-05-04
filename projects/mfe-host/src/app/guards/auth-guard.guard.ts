import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { CommonsLibService } from '@commons-lib';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const commonsLibService = inject(CommonsLibService);
  const router = inject(Router);

  const isLoggedIn = commonsLibService.validateLogin();
  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }
  return isLoggedIn;
};
