import { PreloadAllModules, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard, NotAuthGuard, NotFoundComponent } from '@playerty/spider';
import { LayoutComponent } from './business/layout/layout.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', 
                component: LayoutComponent,
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
                        canActivate: [AuthGuard]
                    },
                    { 
                        path: 'administration',
                        loadChildren: () => import('./features/administration/administration.module').then(m => m.AdministrationModule),
                        canActivate: [AuthGuard]
                    },
                    { 
                        path: '',
                        loadChildren: () => import('./features/notification/notification.module').then(m => m.NotificationModule),
                        canActivate: [AuthGuard]
                    },
                    { 
                        path: '',
                        loadChildren: () => import('./features/voting-theme/voting-theme.module').then(m => m.VotingThemeModule),
                        canActivate: [AuthGuard]
                    },
                    { 
                        path: '',
                        loadChildren: () => import('./features/message/message.module').then(m => m.MessageModule),
                        canActivate: [AuthGuard]
                    },
                ],
            },
            {
                path: '',
                children: [
                    { 
                        path: '',
                        loadChildren: () => import('@playerty/spider').then(m => m.AuthModule),
                        canActivate: [NotAuthGuard],
                    },
                ],
            },
            {
                path: '',
                children: [
                    { 
                        path: '',
                        loadChildren: () => import('./features/legal/legal.module').then(m => m.LegalModule),
                    },
                ],
            },
            { path: 'not-found', component: NotFoundComponent },
            { path: '**', redirectTo: 'not-found' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload', preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
