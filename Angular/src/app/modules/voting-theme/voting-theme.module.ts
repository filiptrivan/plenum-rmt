import { RouterModule, Routes } from "@angular/router";
import { VotingThemeComponent } from "./pages/voting-theme.component";
import { NgModule } from "@angular/core";
import { TranslocoDirective } from "@jsverse/transloco";
import { PrimengModule, CardSkeletonComponent, SpiderControlsModule, SpiderDataTableComponent } from "@playerty/spider";

const routes: Routes = [
    {
        path: 'voting-themes',
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
    ],
    providers:[]
})
export class VotingThemeModule { }
