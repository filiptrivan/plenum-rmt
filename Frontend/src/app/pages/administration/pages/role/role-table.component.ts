import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { ApiService } from 'src/app/business/services/api/api.service';
import { Column, Role } from 'spiderly';

@Component({
    selector: 'role-table',
    templateUrl: './role-table.component.html',
    standalone: false,
    styles: []
})
export class RoleTableComponent implements OnInit {
    cols: Column<Role>[];

    getRoleTableDataObservableMethod = this.apiService.getPaginatedRoleList;
    exportRoleListToExcelObservableMethod = this.apiService.exportRoleListToExcel;
    deleteRoleObservableMethod = this.apiService.deleteRole;

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
            {name: this.translocoService.translate('Name'), filterType: 'text', field: 'name'},
            {name: this.translocoService.translate('CreatedAt'), filterType: 'date', field: 'createdAt', showMatchModes: true},
        ]
    }
}

