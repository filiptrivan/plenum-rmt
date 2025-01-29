import { ValidationErrors } from "@angular/forms";
import { TranslocoService } from '@jsverse/transloco';
import { Injectable } from '@angular/core';
import { ValidatorServiceGenerated } from "./validators.generated";
import { ValidatorAbstractService, SpiderFormControl, SpiderValidatorFn, SpiderFormArray } from '@playerty/spider';

@Injectable({
    providedIn: 'root',
})
export class ValidatorService extends ValidatorAbstractService {

    constructor(
        private translocoService: TranslocoService,
        private validatorServiceGenerated: ValidatorServiceGenerated,
    ) {
        super();
    }

    override setValidator = (formControl: SpiderFormControl, className: string): SpiderValidatorFn => {
        return this.validatorServiceGenerated.setValidator(formControl, className);
    }

    isArrayEmpty = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;
    
            const notEmptyRule = typeof value !== 'undefined' && value !== null && value.length !== 0;
    
            const arrayValid = notEmptyRule;
    
            return arrayValid ? null : { _ : this.translocoService.translate('NotEmpty')};
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        return validator;
    }

    notEmpty = (control: SpiderFormControl): void => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;
    
            const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
    
            const arrayValid = notEmptyRule;
    
            return arrayValid ? null : { _ : this.translocoService.translate('NotEmpty')};
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        control.updateValueAndValidity();
    }
    
    isFormArrayEmpty = (control: SpiderFormArray): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control;
    
            const notEmptyRule = typeof value !== 'undefined' && value !== null && value.length !== 0;
    
            const arrayValid = notEmptyRule;
    
            return arrayValid ? null : { _ : this.translocoService.translate('NotEmpty')};
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        return validator;
    }

}