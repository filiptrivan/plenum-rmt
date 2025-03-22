import { TranslocoService } from '@jsverse/transloco';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/business/services/auth/auth.service';
import { ConfigService } from 'src/app/business/services/config.service';
import { Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FooterComponent, LayoutBaseComponent, AppSidebarComponent, AppTopBarComponent, LayoutBaseService, PrimengModule, SpiderMenuItem} from '@playerty/spider';
import { CommonModule } from '@angular/common';
import { BusinessPermissionCodes } from '../enums/business-enums.generated';
import { SecurityPermissionCodes } from '@playerty/spider';

@Component({
    selector: 'layout',
    templateUrl: './layout.component.html',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        PrimengModule,
        FooterComponent,
        AppSidebarComponent,
        AppTopBarComponent,
    ]
})
export class LayoutComponent extends LayoutBaseComponent implements OnInit, OnDestroy {
    menu: SpiderMenuItem[];

    constructor(
        protected override layoutService: LayoutBaseService, 
        protected override renderer: Renderer2, 
        protected override router: Router,
        private authService: AuthService,
        private config: ConfigService,
        private translocoService: TranslocoService
    ) {
        super(layoutService, renderer, router);
    }

    ngOnInit(): void {
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
                        label: this.translocoService.translate('MessageList'),
                        icon: 'pi pi-fw pi-inbox',
                        routerLink: [`/messages/0`],
                        visible: true,
                    },
                    {
                        label: this.translocoService.translate('Administration'),
                        icon: 'pi pi-fw pi-cog',
                        visible: true,
                        hasPermission: (permissionCodes: string[]): boolean => { 
                            return (
                                permissionCodes?.includes(BusinessPermissionCodes.ReadUserExtended) ||
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
                                        permissionCodes?.includes(BusinessPermissionCodes.ReadUserExtended)
                                    )
                                },
                                visible: true,
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
                                visible: true,
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
                                visible: true,
                            },
                            {
                                label: this.translocoService.translate('VoteTypeList'),
                                icon: 'pi pi-fw pi-thumbs-up',
                                routerLink: [`/${this.config.administrationSlug}/vote-types`],
                                visible: true,
                            },
                            {
                                label: this.translocoService.translate('VotingThemeList'),
                                icon: 'pi pi-fw pi-hammer',
                                routerLink: [`/${this.config.administrationSlug}/voting-themes`],
                                visible: true,
                            },
                        ]
                    },
                ]
            },
        ];
    }

    override onAfterNgDestroy = () => {
        
    }
}

