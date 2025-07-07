import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { Column } from 'spiderly';
import { Notification } from 'src/app/business/entities/business-entities.generated';
import { ApiService } from 'src/app/business/services/api/api.service';

@Component({
    selector: 'notification-table',
    templateUrl: './notification-table.component.html',
    standalone: false,
    styles: []
})
export class NotificationTableComponent implements OnInit {
    cols: Column<Notification>[];

    getNotificationTableDataObservableMethod = this.apiService.getPaginatedNotificationList;
    exportNotificationListToExcelObservableMethod = this.apiService.exportNotificationListToExcel;
    deleteNotificationObservableMethod = this.apiService.deleteNotification;

    constructor(
        private apiService: ApiService,
        private translocoService: TranslocoService,
    ) { }

    ngOnInit(){
        this.cols = [
            {name: this.translocoService.translate('Actions'), actions:[
                {name: this.translocoService.translate('Details'), field: 'Details'},
                {name: this.translocoService.translate('Delete'), field: 'Delete'},
            ]},
            {name: this.translocoService.translate('Title'), filterType: 'text', field: 'title'},
            {name: this.translocoService.translate('CreatedAt'), filterType: 'date', field: 'createdAt', showMatchModes: true},
        ]
    }

}

