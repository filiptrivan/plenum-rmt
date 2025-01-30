import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";
import { MessageComponent } from "./pages/message.component";
import { NgModule } from "@angular/core";
import { TranslocoDirective } from "@jsverse/transloco";
import { PrimengModule, CardSkeletonComponent, SpiderControlsModule, SpiderDataTableComponent } from "@playerty/spider";

const routes: Routes = [
    {
        path: 'messages',
        component: MessageComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        PrimengModule,
        SpiderDataTableComponent,
        SpiderControlsModule,
        CardSkeletonComponent,
        TranslocoDirective,
    ],
    declarations: [
        MessageComponent,
    ],
    providers:[]
})
export class MessageModule { }
