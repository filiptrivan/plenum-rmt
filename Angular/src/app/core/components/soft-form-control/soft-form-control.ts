import { AbstractControl, FormArray, FormControl, FormControlOptions, FormGroup, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { BaseEntity } from '../../entities/base-entity';

export interface SoftValidatorFn extends ValidatorFn {
    hasNotEmptyRule?: boolean;
}

// FT: It's made like generic type because of <number>, <string> etc. not to put class like User.
export class SoftFormControl<T = any> extends FormControl<T> {
    public label: string;
    public required: boolean;
    private _softValidator: SoftValidatorFn | null;

    constructor(value: any, opts: FormControlOptions=null, required:boolean=false) {
        opts = opts ?? {updateOn: 'blur'};
        super(value, opts);
        this.required = required;
     }

    override getRawValue(): T { // FT: Doing this because .value gets only not disabled values
        return super.getRawValue() as T;
    }

    public override get validator(): SoftValidatorFn | null {
        return this._softValidator;
    }

    public override set validator(validator: SoftValidatorFn | null) {
        this._softValidator = validator;
        this.setValidators(validator); 
    }
}

export class SoftFormGroup<TValue = any> extends FormGroup {
    declare controls: { [P in keyof TValue]: SoftFormControl<TValue[P]> };

    constructor(controls: { [P in keyof TValue]: SoftFormControl<TValue[P]> }) {
        super(controls);
    }

    override getRawValue(): TValue { // FT: Doing this because .value gets only not disabled values
        return super.getRawValue() as TValue;
    }

    public name?: string; // FT: Using for nested form groups
    public mainDTOName?: string;
    public saveObservableMethod?: (saveBody: any) => Observable<any>;
    public initSaveBody?: () => BaseEntity = () => null;
    public controlNamesFromHtml?: string[] = [];
}

export class SoftFormArray<TValue = any> extends FormArray {
    override value: TValue; // FT: There is no getRawValue in FormArray
    public required: boolean;
    public modelConstructor: any;
    public translationKey: string;
}