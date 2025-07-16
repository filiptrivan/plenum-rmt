import { RouterModule, Routes } from "@angular/router";
import { NotificationComponent } from "./pages/notification.component";
import { NgModule } from "@angular/core";
import { TranslocoDirective } from "@jsverse/transloco";
import { SpiderlyDataTableComponent, SpiderlyControlsModule, CardSkeletonComponent } from 'spiderly';
import { MenuModule } from "primeng/menu";
import { PaginatorModule } from "primeng/paginator";

const routes: Routes = [
    {
        path: 'notifications',
        component: NotificationComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SpiderlyDataTableComponent,
        SpiderlyControlsModule,
        CardSkeletonComponent,
        TranslocoDirective,
        MenuModule,
        PaginatorModule,
    ],
    declarations: [
        NotificationComponent,
    ],
    providers:[]
})
export class NotificationModule { }

