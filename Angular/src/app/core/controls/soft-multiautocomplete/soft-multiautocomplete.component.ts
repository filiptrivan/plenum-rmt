import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { BaseAutocompleteControl } from '../base-autocomplete-control';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/core/modules/primeng.module';
import { RequiredComponent } from '../../components/required/required.component';
import { TranslocoService } from '@jsverse/transloco';
import { TranslateLabelsService } from 'src/app/business/services/translates/merge-labels';

@Component({
    selector: 'soft-multiautocomplete',
    templateUrl: './soft-multiautocomplete.component.html',
    styles: [],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule,
        PrimengModule,
        CommonModule,
        RequiredComponent
    ]
})
export class SoftMultiAutocompleteComponent extends BaseAutocompleteControl implements OnInit {
    // @Input() required: boolean = true; // TODO FT: delete if you don't need through whole app
    
    constructor(
        protected override translocoService: TranslocoService,
        protected override translateLabelsService: TranslateLabelsService,
    ) { 
        super(translocoService, translateLabelsService);
    }

    override ngOnInit(){
        super.ngOnInit();
    }

    search(event: AutoCompleteCompleteEvent){
        this.onTextInput.next(event);
    }

    buttonClick(){

    }

}
