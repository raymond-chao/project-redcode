import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [provideZonelessChangeDetection(),
  provideRouter(routes),
  provideHttpClient(),
  provideToastr({positionClass:'toast-top-center'})]
};
