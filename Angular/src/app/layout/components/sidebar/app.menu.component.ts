import { TranslocoService } from '@jsverse/transloco';
import { Subscription } from 'rxjs';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../../services/app.layout.service';
import { MenuItem } from 'primeng/api';
import { environment } from 'src/environments/environment';

export interface SoftMenuItem extends MenuItem{
    hasPermission?: (permissionCodes: string[]) => boolean;
}

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    model: SoftMenuItem[] = [];

    constructor(
        public layoutService: LayoutService, 
        private translocoService: TranslocoService
    ) {

    }

    ngOnInit() {
        this.model = [
            {
                items: [
                    {
                        label: `${environment.companyName}`,
                        icon: 'pi pi-fw pi-at', 
                        visible: true,
                    }
                ],
                visible: true,
            },
            {
                separator: true,
                visible: true,
            },
            {
                items: [
                    { 
                        label: this.translocoService.translate('Home'), 
                        icon: 'pi pi-fw pi-home', 
                        routerLink: [''],
                        visible: true,
                    }, 
                ],
                visible: true,
            },
        ];
    }


    ngOnDestroy(): void {
    }

}

