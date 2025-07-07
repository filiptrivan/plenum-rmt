import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { ApiService } from 'src/app/business/services/api/api.service';
import { VotingTheme } from 'src/app/business/entities/business-entities.generated';
import { Column } from 'spiderly';

@Component({
    selector: 'voting-theme-table',
    templateUrl: './voting-theme-table.component.html',
    standalone: false,
    styles: []
})
export class VotingThemeTableComponent implements OnInit {
    cols: Column<VotingTheme>[];

    getVotingThemeTableDataObservableMethod = this.apiService.getPaginatedVotingThemeList;
    exportVotingThemeListToExcelObservableMethod = this.apiService.exportVotingThemeListToExcel;
    deleteVotingThemeObservableMethod = this.apiService.deleteVotingTheme;

    constructor(
        private apiService: ApiService,
        private translocoService: TranslocoService,
    ) { }

    async ngOnInit(){
        this.cols = [
            {name: this.translocoService.translate('Actions'), actions:[
                {name: this.translocoService.translate('Details'), field: 'Details'},
            ]},
            {name: this.translocoService.translate('Name'), filterType: 'text', field: 'name'},
            {name: this.translocoService.translate('Description'), filterType: 'text', field: 'description'},
            {name: this.translocoService.translate('CreatedAt'), filterType: 'date', field: 'createdAt', showMatchModes: true},
            {name: this.translocoService.translate('ModifiedAt'), filterType: 'date', field: 'modifiedAt', showMatchModes: true},
        ]
    }

}

