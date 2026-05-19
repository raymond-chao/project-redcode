import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [provideExperimentalZonelessChangeDetection(),
  provideRouter(routes),
  provideHttpClient(),
  provideToastr({positionClass:'toast-top-center'})]
};
