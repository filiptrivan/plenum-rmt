import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { BaseAutocompleteControl } from '../base-autocomplete-control';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/core/modules/primeng.module';
import { RequiredComponent } from '../../components/required/required.component';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { TranslateLabelsService } from 'src/app/business/services/translates/merge-labels';

@Component({
    selector: 'soft-autocomplete',
    templateUrl: './soft-autocomplete.component.html',
    styles: [],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule,
        PrimengModule,
        CommonModule,
        RequiredComponent,
        TranslocoDirective,
    ]
})
export class SoftAutocompleteComponent extends BaseAutocompleteControl implements OnInit {
    // @Input() required: boolean = true; // TODO FT: delete if you don't need through whole app
    @Input() appendTo: any = 'body';
    @Input() showClear: boolean = true;
    @Input() emptyMessage: string;
    @Input() displayName: string; // FT: Added because when we initialize the object options are null

    constructor(
        protected override translocoService: TranslocoService,
        protected override translateLabelsService: TranslateLabelsService,
    ) { 
        super(translocoService, translateLabelsService);
    }

    override ngOnInit(){
        super.ngOnInit();

        if (this.options == null && this.control.value != null) {
            this.options = [
                { label: this.displayName, value: this.control.value }
            ];
        }

        if (this.emptyMessage == null) {
            this.emptyMessage = this.translocoService.translate('EmptyMessage');
        }
    }

    search(event: AutoCompleteCompleteEvent){
        this.onTextInput.next(event);
    }

    buttonClick(){

    }

    select(event){
    }

}
