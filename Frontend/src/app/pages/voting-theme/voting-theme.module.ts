import { RouterModule, Routes } from "@angular/router";
import { VotingThemeComponent } from "./pages/voting-theme.component";
import { NgModule } from "@angular/core";
import { TranslocoDirective } from "@jsverse/transloco";
import { PrimengModule, CardSkeletonComponent, SpiderlyControlsModule, SpiderlyDataTableComponent } from "spiderly";
import { VotingThemeTableComponent } from "./pages/voting-theme-table.component";

const routes: Routes = [
    {
        path: 'voting-themes',
        component: VotingThemeTableComponent,
    },
    {
        path: 'voting-themes/:id',
        component: VotingThemeComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        PrimengModule,
        SpiderlyDataTableComponent,
        SpiderlyControlsModule,
        CardSkeletonComponent,
        TranslocoDirective,
    ],
    declarations: [
        VotingThemeComponent,
        VotingThemeTableComponent,
    ],
    providers:[]
})
export class VotingThemeModule { }
