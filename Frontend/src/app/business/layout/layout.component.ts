import { TranslocoService } from '@jsverse/transloco';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfigService } from 'src/app/business/services/config.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SpiderlylyLayoutComponent, SpiderlylyMenuItem, SecurityPermissionCodes } from 'spiderly';
import { CommonModule } from '@angular/common';
import { BusinessPermissionCodes } from '../enums/business-enums.generated';

@Component({
    selector: 'layout',
    templateUrl: './layout.component.html',
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        SpiderlylyLayoutComponent,
    ]
})
export class LayoutComponent {
    menu: SpiderlylyMenuItem[];

    constructor(
        private config: ConfigService,
        private translocoService: TranslocoService
    ) {
    }

    ngOnInit(): void {
        this.menu = [
            {
                items: [
                    { 
                        label: this.translocoService.translate('Home'), 
                        icon: 'pi pi-fw pi-home', 
                        routerLink: [''],
                    },
                    {
                        label: this.translocoService.translate('VotingThemeList'),
                        icon: 'pi pi-fw pi-hammer',
                        routerLink: [`/voting-themes`],
                    },
                    {
                        label: this.translocoService.translate('MessageList'),
                        icon: 'pi pi-fw pi-inbox',
                        routerLink: [`/messages/0`],
                    },
                    {
                        label: this.translocoService.translate('Administration'),
                        icon: 'pi pi-fw pi-cog',
                        hasPermission: (permissionCodes: string[]): boolean => { 
                            return (
                                permissionCodes?.includes(BusinessPermissionCodes.ReadUser) ||
                                permissionCodes?.includes(SecurityPermissionCodes.ReadRole) ||
                                permissionCodes?.includes(BusinessPermissionCodes.ReadNotification)
                            )
                        },
                        items: [
                            {
                                label: this.translocoService.translate('UserList'),
                                icon: 'pi pi-fw pi-user',
                                routerLink: [`/${this.config.administrationSlug}/users`],
                                hasPermission: (permissionCodes: string[]): boolean => { 
                                    return (
                                        permissionCodes?.includes(BusinessPermissionCodes.ReadUser)
                                    )
                                },
                            },
                            {
                                label: this.translocoService.translate('RoleList'),
                                icon: 'pi pi-fw pi-id-card',
                                routerLink: [`/${this.config.administrationSlug}/roles`],
                                hasPermission: (permissionCodes: string[]): boolean => { 
                                    return (
                                        permissionCodes?.includes(SecurityPermissionCodes.ReadRole)
                                    )
                                },
                            },
                            {
                                label: this.translocoService.translate('NotificationList'),
                                icon: 'pi pi-fw pi-bell',
                                routerLink: [`/${this.config.administrationSlug}/notifications`],
                                hasPermission: (permissionCodes: string[]): boolean => { 
                                    return (
                                        permissionCodes?.includes(BusinessPermissionCodes.ReadNotification)
                                    )
                                },
                            },
                            {
                                label: this.translocoService.translate('VoteTypeList'),
                                icon: 'pi pi-fw pi-thumbs-up',
                                routerLink: [`/${this.config.administrationSlug}/vote-types`],
                            },
                            {
                                label: this.translocoService.translate('VotingThemeList'),
                                icon: 'pi pi-fw pi-hammer',
                                routerLink: [`/${this.config.administrationSlug}/voting-themes`],
                            },
                        ]
                    },
                ]
            },
        ];
    }
}

