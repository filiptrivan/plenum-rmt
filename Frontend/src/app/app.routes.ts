import { InMemoryScrollingOptions, RouterConfigOptions, Routes } from '@angular/router';
import { AuthGuard, NotAuthGuard } from 'spiderly';
import { LayoutComponent } from './business/layout/layout.component';

const layoutRoutes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(c => c.DashboardModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'administration',
        loadChildren: () => import('./pages/administration/administration.module').then(c => c.AdministrationModule),
        canActivate: [AuthGuard],
    },
    { 
        path: 'notifications',
        loadChildren: () => import('./pages/notification/notification.module').then(c => c.NotificationModule),
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
];

export const routes: Routes = [
    {
        path: '', 
        component: LayoutComponent,
        children: layoutRoutes,
    },
    {
        path: 'login',
        loadComponent: () => import('spiderly').then(c => c.LoginComponent),
        canActivate: [NotAuthGuard],
    },
    {
        path: 'registration', loadComponent: () => import('spiderly').then(c => c.RegistrationComponent),
        canActivate: [NotAuthGuard],
    },
    { path: 'not-found', loadComponent: () => import('spiderly').then(c => c.NotFoundComponent) },
    { path: '**', redirectTo: 'not-found' },
];

export const scrollConfig: InMemoryScrollingOptions = {
    scrollPositionRestoration: 'top',
    anchorScrolling: 'enabled',
};

export const routerConfigOptions: RouterConfigOptions = {
    onSameUrlNavigation: 'reload',
};
