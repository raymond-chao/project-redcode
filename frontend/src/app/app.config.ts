import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideZonelessChangeDetection(),
  provideRouter(routes),
  provideHttpClient(),
  provideAnimationsAsync(),
  provideToastr({positionClass:'toast-top-center'})]
};
