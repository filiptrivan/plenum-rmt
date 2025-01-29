import { TranslocoService } from '@jsverse/transloco';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../../services/app.layout.service';
import { MenuItem } from 'primeng/api';
import { ConfigService } from 'src/app/business/services/config.service';

export interface SoftMenuItem extends MenuItem{
    hasPermission?: (permissionCodes: string[]) => boolean;
}

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    menu: SoftMenuItem[] = [];

    constructor(
        public layoutService: LayoutService, 
        private translocoService: TranslocoService,
        private config: ConfigService
    ) {

    }

    ngOnInit() {
        this.menu = [
            {
                visible: true,
                items: [
                    { 
                        label: this.translocoService.translate('Home'), 
                        icon: 'pi pi-fw pi-home', 
                        routerLink: [''],
                        visible: true,
                    },
                    {
                        label: this.translocoService.translate('VotingThemeList'),
                        icon: 'pi pi-fw pi-hammer',
                        routerLink: [`/voting-themes`],
                        visible: true,
                    },
                    {
                        label: this.translocoService.translate('Administration'),
                        icon: 'pi pi-fw pi-cog',
                        visible: true,
                        items: [
                            {
                                label: this.translocoService.translate('UserList'),
                                icon: 'pi pi-fw pi-user',
                                routerLink: [`/${this.config.administrationSlug}/users`],
                                // hasPermission: (permissionCodes: string[]): boolean => { 
                                //     return (permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadUserExtended]))
                                // } 
                                visible: true,
                            },
                            {
                                label: this.translocoService.translate('RoleList'),
                                icon: 'pi pi-fw pi-id-card',
                                routerLink: [`/${this.config.administrationSlug}/roles`],
                                // hasPermission: (permissionCodes: string[]): boolean => { 
                                //     return (permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadRole]))
                                // }
                                visible: true,
                            },
                            {
                                label: this.translocoService.translate('NotificationList'),
                                icon: 'pi pi-fw pi-bell',
                                routerLink: [`/${this.config.administrationSlug}/notifications`],
                                // hasPermission: (permissionCodes: string[]): boolean => { 
                                //     return (permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadNotification]))
                                // }
                                visible: true,
                            },
                            {
                                label: this.translocoService.translate('VoteTypeList'),
                                icon: 'pi pi-fw pi-thumbs-up',
                                routerLink: [`/${this.config.administrationSlug}/vote-types`],
                                // hasPermission: (permissionCodes: string[]): boolean => { 
                                //     return (permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadVoteType]))
                                // }
                                visible: true,
                            },
                            {
                                label: this.translocoService.translate('VotingThemeList'),
                                icon: 'pi pi-fw pi-hammer',
                                routerLink: [`/${this.config.administrationSlug}/voting-themes`],
                                // hasPermission: (permissionCodes: string[]): boolean => { 
                                //     return (permissionCodes?.includes(PermissionCodes[PermissionCodes.ReadVotingTheme]))
                                // }
                                visible: true,
                            },
                        ]
                    }
                ]
            },
        ];
    }


    ngOnDestroy(): void {
    }

}

