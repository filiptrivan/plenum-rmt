import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { ApiService } from 'src/app/business/services/api/api.service';
import { VoteType } from 'src/app/business/entities/business-entities.generated';
import { Column } from 'spiderly';

@Component({
    selector: 'vote-type-table',
    templateUrl: './vote-type-table.component.html',
    standalone: false,
    styles: []
})
export class VoteTypeTableComponent implements OnInit {
    cols: Column<VoteType>[];

    getVoteTypeTableDataObservableMethod = this.apiService.getPaginatedVoteTypeList;
    exportVoteTypeListToExcelObservableMethod = this.apiService.exportVoteTypeListToExcel;
    deleteVoteTypeObservableMethod = this.apiService.deleteVoteType;

    constructor(
        private apiService: ApiService,
        private translocoService: TranslocoService,
    ) { }

    async ngOnInit(){
        this.cols = [
            {name: this.translocoService.translate('Actions'), actions:[
                {name: this.translocoService.translate('Details'), field: 'Details'},
                {name: this.translocoService.translate('Delete'), field: 'Delete'},
            ]},
            {name: this.translocoService.translate('Name'), filterType: 'text', field: 'name'},
            {name: this.translocoService.translate('Icon'), filterType: 'text', field: 'icon'},
            {name: this.translocoService.translate('Id'), filterType: 'numeric', field: 'id', showMatchModes: true},
            {name: this.translocoService.translate('Version'), filterType: 'numeric', field: 'version', showMatchModes: true},
            {name: this.translocoService.translate('CreatedAt'), filterType: 'date', field: 'createdAt', showMatchModes: true},
            {name: this.translocoService.translate('ModifiedAt'), filterType: 'date', field: 'modifiedAt', showMatchModes: true},
        ]
    }

}

