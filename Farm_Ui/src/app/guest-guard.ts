import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const guestGuard: CanActivateFn = (route, state) => {

  let navi=inject(Router)
  let token=sessionStorage.getItem('token');
 
  console.log('Guest Guard Called');
  if (!token) {
    //redirect to its logib page  
   
      console.log('Allow Login');
    return true;
  }
  let role=sessionStorage.getItem('role')
  switch(role){
   
    case 'customer':
      return navi.createUrlTree(['/user']);
    case 'admin':
      return navi.createUrlTree(['/admin']);
    case 'farmer':
      return navi.createUrlTree(['/farmer']);
    default :
      return navi.createUrlTree(['/home']);
  }

};
