import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  const role = sessionStorage.getItem('role');

  console.log("Guard Role:", role);
  console.log("Expected:", route.data['role']);

  if (role === route.data['role']) {
    return true;
  }

  return router.createUrlTree(['/login']);
};