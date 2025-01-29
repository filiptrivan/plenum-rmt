import { RouterModule, Routes } from "@angular/router";
import { VotingThemeComponent } from "./pages/voting-theme.component";
import { NgModule } from "@angular/core";
import { TranslocoDirective } from "@jsverse/transloco";
import { PrimengModule, CardSkeletonComponent, SpiderControlsModule, SpiderDataTableComponent } from "@playerty/spider";
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
        SpiderDataTableComponent,
        SpiderControlsModule,
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
