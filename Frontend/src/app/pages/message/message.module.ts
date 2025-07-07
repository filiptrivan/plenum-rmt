import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";
import { MessageComponent } from "./pages/message.component";
import { NgModule } from "@angular/core";
import { TranslocoDirective } from "@jsverse/transloco";
import { CardSkeletonComponent, SpiderlyControlsModule, SpiderlyDataTableComponent } from "spiderly";

const routes: Routes = [
    {
        path: 'messages/:id',
        component: MessageComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        SpiderlyDataTableComponent,
        SpiderlyControlsModule,
        CardSkeletonComponent,
        TranslocoDirective,
    ],
    declarations: [
        MessageComponent,
    ],
    providers:[]
})
export class MessageModule { }
