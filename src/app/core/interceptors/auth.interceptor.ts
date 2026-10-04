import {
  HttpInterceptorFn
} from '@angular/common/http';


export const authInterceptor: HttpInterceptorFn = (
  req,
  next
) => {

  const accessToken =
    localStorage.getItem('access');


  if (!accessToken) {

    return next(req);

  }


  const authReq = req.clone({

    setHeaders: {

      Authorization:
        `Bearer ${accessToken}`

    }

  });


  return next(authReq);

};