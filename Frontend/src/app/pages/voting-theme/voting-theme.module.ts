import { RouterModule, Routes } from "@angular/router";
import { VotingThemeComponent } from "./pages/voting-theme.component";
import { NgModule } from "@angular/core";
import { TranslocoDirective } from "@jsverse/transloco";
import { CardSkeletonComponent, SpiderlyControlsModule, SpiderlyDataTableComponent } from "spiderly";
import { VotingThemeTableComponent } from "./pages/voting-theme-table.component";
import { ButtonModule } from "primeng/button";
import { TooltipModule } from "primeng/tooltip";

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
        SpiderlyDataTableComponent,
        SpiderlyControlsModule,
        CardSkeletonComponent,
        TranslocoDirective,
        ButtonModule,
        TooltipModule,
    ],
    declarations: [
        VotingThemeComponent,
        VotingThemeTableComponent,
    ],
    providers:[]
})
export class VotingThemeModule { }
