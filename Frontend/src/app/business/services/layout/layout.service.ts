import { Injectable, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/business/services/api/api.service';
import { ConfigService } from '../config.service';
import { LayoutBaseService } from 'spiderly';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LayoutService extends LayoutBaseService implements OnDestroy {

    constructor(
        protected override apiService: ApiService,
        protected override config: ConfigService,
        protected override authService: AuthService,
    ) {
        super(apiService, config, authService);

        this.initUnreadNotificationsCountForCurrentUser();
    }

}

