import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/business/services/api/api.service';
import { AuthService } from 'src/app/business/services/auth/auth.service';
import { MenuItem } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';
import { TranslocoService } from '@jsverse/transloco';
import { Notification, VotingTheme } from 'src/app/business/entities/business-entities.generated';
import { Menu } from 'primeng/menu';
import { TableResponse, TableFilter, TableFilterContext, SpiderMessageService } from '@playerty/spider';

@Component({
  templateUrl: './voting-theme.component.html',
})
export class VotingThemeComponent implements OnInit {
  votingThemes: TableResponse<VotingTheme>;

  crudMenu: MenuItem[] = [];
  @ViewChild('menu') menu: Menu;
  lastMenuToggledVotingTheme: VotingTheme;

  tableFilter: TableFilter = new TableFilter({
    first: 0,
    rows: 10,
    filters: new Map<string, TableFilterContext[]>()
  });

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private translocoService: TranslocoService,
    private messageService: SpiderMessageService,
  ) {}

  ngOnInit() {
    this.crudMenu = [
      {label: this.translocoService.translate('Delete'), command: null, icon: 'pi pi-trash'},
      {label: this.translocoService.translate('MarkAsRead'), command: null, icon: 'pi pi-eye'},
      {label: this.translocoService.translate('MarkAsUnread'), command: null, icon: 'pi pi-eye-slash'},
    ];

    this.getVotingThemes();
  }

  onLazyLoad(event: PaginatorState){
    this.tableFilter.first = event.first;
    this.tableFilter.rows = event.rows;
    this.getVotingThemes();
  }
  
  getVotingThemes(){
    this.apiService.getVotingThemeListForDisplay(this.tableFilter).subscribe((res) => {
      this.votingThemes = res;
    });
  }

  menuToggle($event: MouseEvent, notification: Notification) {
    this.menu.toggle($event);
    this.lastMenuToggledVotingTheme = notification;
  }

}
