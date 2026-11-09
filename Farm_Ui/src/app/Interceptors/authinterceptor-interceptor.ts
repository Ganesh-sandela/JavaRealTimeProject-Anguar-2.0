import { HttpInterceptorFn } from '@angular/common/http';

export const authinterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  let role=sessionStorage.getItem('role');
  let token=sessionStorage.getItem('token');

  if (!token) {
    return next(req)
  }
  let auth=req.clone({
    setHeaders:{
     Authorization: `Bearer ${token}`

    }
  })
  return next(auth);
};
