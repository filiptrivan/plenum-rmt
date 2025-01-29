import { ApiService } from './../../../../business/services/api/api.service';
import { TranslocoService } from '@jsverse/transloco';
import { Component, OnInit } from '@angular/core';
import { Column } from '@playerty/spider';

@Component({
    selector: 'user-table',
    templateUrl: './user-table.component.html',
    styles: []
})
export class UserTableComponent implements OnInit {
    cols: Column[];

    getUserTableDataObservableMethod = this.apiService.getUserExtendedTableData;
    exportUserTableDataToExcelObservableMethod = this.apiService.exportUserExtendedTableDataToExcel;
    deleteUserObservableMethod = this.apiService.deleteUserExtended;

    constructor(
        private apiService: ApiService,
        private translocoService: TranslocoService,
    ) { }

    ngOnInit(){
        this.cols = [
            {name: this.translocoService.translate('Actions'), actions:[
                {name: this.translocoService.translate('Details'), field: 'Details'},
                {name:  this.translocoService.translate('Delete'), field: 'Delete'},
            ]},
            {name: this.translocoService.translate('Email'), filterType: 'text', field: 'email'},
            {name: this.translocoService.translate('CreatedAt'), filterType: 'date', field: 'createdAt', showMatchModes: true},
        ]
    }
}