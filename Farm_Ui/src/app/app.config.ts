import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { publicRoutes } from './publicpage/public.routes';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authinterceptorInterceptor } from './Interceptors/authinterceptor-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter([...routes,...publicRoutes]),
    provideHttpClient(withInterceptors([authinterceptorInterceptor]))
  ]
};
