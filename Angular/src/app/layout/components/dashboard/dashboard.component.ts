import { ApiService } from '../../../business/services/api/api.service';
import { LayoutService } from '../../services/app.layout.service';
import { Component, OnInit } from '@angular/core';
import { SoftMessageService } from 'src/app/core/services/soft-message.service';
import { AuthService } from 'src/app/business/services/auth/auth.service';
import { firstValueFrom, Subscription } from 'rxjs';

@Component({
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  private permissionsSubscription: Subscription | null = null;

  constructor(
    public layoutService: LayoutService,
    private apiService: ApiService,
    private messageService: SoftMessageService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    
  }

  ngOnDestroy(): void {
    
  }
}

