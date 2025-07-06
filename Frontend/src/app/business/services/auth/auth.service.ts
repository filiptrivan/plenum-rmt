import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/business/services/api/api.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { ConfigService } from '../config.service';
import { AuthBaseService } from 'spiderly';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends AuthBaseService implements OnDestroy {

  constructor(
    protected override router: Router,
    protected override http: HttpClient,
    protected override externalAuthService: SocialAuthService,
    protected override apiService: ApiService,
    protected override config: ConfigService,
  ) {
    super(router, http, externalAuthService, apiService, config);
  }

}
