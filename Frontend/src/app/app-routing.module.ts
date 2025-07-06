import { PreloadAllModules, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard, NotAuthGuard, NotFoundComponent } from 'spiderly';
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
                        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
                        canActivate: [AuthGuard]
                    },
                    { 
                        path: 'administration',
                        loadChildren: () => import('./pages/administration/administration.module').then(m => m.AdministrationModule),
                        canActivate: [AuthGuard]
                    },
                    { 
                        path: '',
                        loadChildren: () => import('./pages/notification/notification.module').then(m => m.NotificationModule),
                        canActivate: [AuthGuard]
                    },
                    { 
                        path: '',
                        loadChildren: () => import('./pages/voting-theme/voting-theme.module').then(m => m.VotingThemeModule),
                        canActivate: [AuthGuard]
                    },
                    { 
                        path: '',
                        loadChildren: () => import('./pages/message/message.module').then(m => m.MessageModule),
                        canActivate: [AuthGuard]
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
