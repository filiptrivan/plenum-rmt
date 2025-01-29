import { ApiService } from '../../../business/services/api/api.service';
import { LayoutService } from '../../services/app.layout.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/business/services/auth/auth.service';
import { firstValueFrom, Subscription } from 'rxjs';
import { SpiderMessageService } from '@playerty/spider';

@Component({
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  private permissionsSubscription: Subscription | null = null;

  constructor(
    public layoutService: LayoutService,
    private apiService: ApiService,
    private messageService: SpiderMessageService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    
  }

  ngOnDestroy(): void {
    
  }
}

