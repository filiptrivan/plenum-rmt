import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTableComponent } from './pages/user/user-table.component';
import { UserDetailsComponent } from './pages/user/user-details.component';
import { RoleTableComponent } from './pages/role/role-table.component';
import { RoleDetailsComponent } from './pages/role/role-details.component';
import { NotificationDetailsComponent } from './pages/notification/notification-details.component';
import { NotificationTableComponent } from './pages/notification/notification-table.component';
import { TranslocoDirective } from '@jsverse/transloco';
import { NotificationBaseDetailsComponent, UserBaseDetailsComponent, VoteTypeBaseDetailsComponent, VotingThemeBaseDetailsComponent } from 'src/app/business/components/base-details/business-base-details.generated';
import { SpiderlyDataTableComponent, SpiderlyControlsModule, CardSkeletonComponent } from 'spiderly';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VoteTypeDetailsComponent } from './pages/vote-type/vote-type-details.component';
import { VoteTypeTableComponent } from './pages/vote-type/vote-type-table.component';
import { VotingThemeDetailsComponent } from './pages/voting-theme/voting-theme-details.component';
import { VotingThemeTableComponent } from './pages/voting-theme/voting-theme-table.component';

const routes: Routes = [
    {
        path: 'users',
        component: UserTableComponent,
    },
    {
        path: 'users/:id',
        component: UserDetailsComponent,
    },
    {
        path: 'roles',
        component: RoleTableComponent,
    },
    {
        path: 'roles/:id',
        component: RoleDetailsComponent,
    },
    {
        path: 'notifications',
        component: NotificationTableComponent,
    },
    {
        path: 'notifications/:id',
        component: NotificationDetailsComponent,
    },
    {
        path: 'vote-types',
        component: VoteTypeTableComponent,
    },
    {
        path: 'vote-types/:id',
        component: VoteTypeDetailsComponent,
    },
    {
        path: 'voting-themes',
        component: VotingThemeTableComponent,
    },
    {
        path: 'voting-themes/:id',
        component: VotingThemeDetailsComponent,
    },
];

@NgModule({
    imports: [ 
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpiderlyDataTableComponent,
        SpiderlyControlsModule,
        CardSkeletonComponent,
        TranslocoDirective,
        NotificationBaseDetailsComponent,
        UserBaseDetailsComponent,
        VoteTypeBaseDetailsComponent,
        VotingThemeBaseDetailsComponent
    ],
    declarations: [
        UserTableComponent,
        UserDetailsComponent, 
        RoleTableComponent,
        RoleDetailsComponent,
        NotificationTableComponent,
        NotificationDetailsComponent,
        VoteTypeTableComponent,
        VoteTypeDetailsComponent,
        VotingThemeTableComponent,
        VotingThemeDetailsComponent,
    ],
    providers:[]
})
export class AdministrationModule { }