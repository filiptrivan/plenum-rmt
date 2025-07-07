import { APP_INITIALIZER, ApplicationConfig, ErrorHandler, PLATFORM_ID, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading, withRouterConfig } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routerConfigOptions, routes, scrollConfig } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { providePrimeNG } from 'primeng/config';
import { MessageService, ConfirmationService } from 'primeng/api';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { SocialAuthServiceConfig, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { environment } from '../environments/environment';
import { AuthBaseService, authInitializer, ConfigBaseService, httpLoadingInterceptor, jsonHttpInterceptor, jwtInterceptor, LayoutBaseService, SpiderlyErrorHandler, SpiderlyTranslocoLoader, TranslateLabelsAbstractService, unauthorizedInterceptor, ValidatorAbstractService } from 'spiderly';
import { DialogService } from "primeng/dynamicdialog";
import { provideTransloco } from '@jsverse/transloco';
import { AuthService } from './business/services/auth/auth.service';
import { LayoutService } from './business/services/layout/layout.service';
import { ConfigService } from './business/services/config.service';
import { ValidatorService } from './business/services/validators/validators';
import { TranslateLabelsService } from './business/services/translates/merge-labels';
import { ThemePreset } from 'src/assets/primeng-theme';
import { provideSpinnerConfig } from 'ngx-spinner';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideTransloco({
      config: {
        availableLangs: [
          'en', 'en.generated',
        ],
        defaultLang: 'en',
        fallbackLang: 'en.generated',
        failedRetries: 0,
        missingHandler: {
          useFallbackTranslation: true,
          logMissingKey: false,
        },
        reRenderOnLangChange: true,
      },
      loader: SpiderlyTranslocoLoader
    }),
    providePrimeNG({
      theme: {
        preset: ThemePreset,
        options: {
          darkModeSelector: '.dark'
        }
      }
    }),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling(scrollConfig),
      withRouterConfig(routerConfigOptions)
    ),
    provideSpinnerConfig({type: 'ball-clip-rotate-multiple'}),
    provideClientHydration(withEventReplay()),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.GoogleClientId,
              {
                scopes: 'email',
                oneTapEnabled: false,
                prompt: 'none',
              },
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig
    },
    MessageService,
    ConfirmationService,
    DialogService,
    {
      provide: ErrorHandler,
      useClass: SpiderlyErrorHandler,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: authInitializer,
      multi: true,
      deps: [AuthService, PLATFORM_ID],
    },
    {
      provide: ValidatorAbstractService,
      useClass: ValidatorService,
    },
    {
      provide: TranslateLabelsAbstractService,
      useClass: TranslateLabelsService,
    },
    {
      provide: AuthBaseService,
      useExisting: AuthService
    },
    {
      provide: ConfigBaseService,
      useExisting: ConfigService
    },
    {
      provide: LayoutBaseService,
      useExisting: LayoutService
    },
    provideHttpClient(withInterceptors([
      httpLoadingInterceptor,
      jsonHttpInterceptor,
      jwtInterceptor,
      unauthorizedInterceptor,
    ])),
  ]
};
