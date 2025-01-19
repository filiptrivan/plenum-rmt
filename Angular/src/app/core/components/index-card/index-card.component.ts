import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, LOCALE_ID, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { PrimengModule } from 'src/app/core/modules/primeng.module';
import { SoftPanelsModule } from "../soft-panels/soft-panels.module";

@Component({
    selector: 'index-card',
    templateUrl: './index-card.component.html',
    standalone: true,
    imports: [
    CommonModule,
    PrimengModule,
    SoftPanelsModule
]
})
export class IndexCardComponent {
    @Input() public last: boolean;
    @Input() public index: number;
    @Input() public header: string = '';
    @Input() public description: string;
    @Input() public showRemoveIcon: boolean;

    @Input() crudMenu: MenuItem[];

    @Output() onMenuIconClick: EventEmitter<number> = new EventEmitter();
    @Output() onRemoveIconClick: EventEmitter<null> = new EventEmitter();
    
    constructor(
        protected formBuilder: FormBuilder,
        ) {

        }

    ngOnInit(){
        // console.log(this.last);
    }

    menuIconClick(index: number){
        this.onMenuIconClick.next(index);
    }

    removeIconClick(){
        this.onRemoveIconClick.next(null);
    }

}