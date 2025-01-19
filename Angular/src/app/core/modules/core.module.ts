import { NgModule, APP_INITIALIZER, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from '../../business/services/auth/auth.service';
import { appInitializer } from '../services/app-initializer';
import { JwtInterceptor } from '../interceptors/jwt.interceptor';
import { UnauthorizedInterceptor } from '../interceptors/unauthorized.interceptor';
import { HttpLoadingInterceptor } from '../interceptors/http-loading.interceptor';
import { JsonHttpInterceptor } from '../interceptors/json-parser.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
   ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService],
    },
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true 
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoadingInterceptor,
      multi: true,
    },
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: JsonHttpInterceptor,
      multi: true
    }
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('Core Module can only be imported to AppModule.');
    }
  }
}