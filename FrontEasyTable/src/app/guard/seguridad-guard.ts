import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Loginservice } from '../services/loginservice';

export const seguridadGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loginService = inject(Loginservice);

  if (loginService.verificar()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
