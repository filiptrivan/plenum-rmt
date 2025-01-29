import { ValidationErrors } from '@angular/forms';
import { TranslocoService } from '@jsverse/transloco';
import { Injectable } from '@angular/core';
import { SpiderFormControl, SpiderValidatorFn, validatePrecisionScale } from '@playerty/spider';

@Injectable({
    providedIn: 'root',
})
export class ValidatorServiceGenerated {

    constructor(
        protected translocoService: TranslocoService
    ) {
    }

    setValidator = (formControl: SpiderFormControl, className: string): SpiderValidatorFn => {
        switch(formControl.label + className){











        case 'emailLogin':
            return this.emailLoginValidator(formControl);


        case 'textMessage':
            return this.textMessageValidator(formControl);
        case 'senderIdMessage':
            return this.senderIdMessageValidator(formControl);
        case 'versionMessage':
            return this.versionMessageValidator(formControl);
        case 'createdAtMessage':
            return this.createdAtMessageValidator(formControl);
        case 'modifiedAtMessage':
            return this.modifiedAtMessageValidator(formControl);




        case 'titleNotification':
            return this.titleNotificationValidator(formControl);
        case 'descriptionNotification':
            return this.descriptionNotificationValidator(formControl);
        case 'emailBodyNotification':
            return this.emailBodyNotificationValidator(formControl);
        case 'versionNotification':
            return this.versionNotificationValidator(formControl);
        case 'createdAtNotification':
            return this.createdAtNotificationValidator(formControl);
        case 'modifiedAtNotification':
            return this.modifiedAtNotificationValidator(formControl);



        case 'namePermission':
            return this.namePermissionValidator(formControl);
        case 'nameLatinPermission':
            return this.nameLatinPermissionValidator(formControl);
        case 'descriptionPermission':
            return this.descriptionPermissionValidator(formControl);
        case 'descriptionLatinPermission':
            return this.descriptionLatinPermissionValidator(formControl);
        case 'codePermission':
            return this.codePermissionValidator(formControl);





        case 'emailRegistration':
            return this.emailRegistrationValidator(formControl);



        case 'nameRole':
            return this.nameRoleValidator(formControl);
        case 'descriptionRole':
            return this.descriptionRoleValidator(formControl);
        case 'versionRole':
            return this.versionRoleValidator(formControl);
        case 'createdAtRole':
            return this.createdAtRoleValidator(formControl);
        case 'modifiedAtRole':
            return this.modifiedAtRoleValidator(formControl);










        case 'emailUserExtended':
            return this.emailUserExtendedValidator(formControl);
        case 'versionUserExtended':
            return this.versionUserExtendedValidator(formControl);
        case 'createdAtUserExtended':
            return this.createdAtUserExtendedValidator(formControl);
        case 'modifiedAtUserExtended':
            return this.modifiedAtUserExtendedValidator(formControl);




        case 'voteTypeIdUserExtendedVotingThemeItem':
            return this.voteTypeIdUserExtendedVotingThemeItemValidator(formControl);






        case 'verificationCodeVerificationTokenRequest':
            return this.verificationCodeVerificationTokenRequestValidator(formControl);
        case 'emailVerificationTokenRequest':
            return this.emailVerificationTokenRequestValidator(formControl);

        case 'nameVoteType':
            return this.nameVoteTypeValidator(formControl);
        case 'iconVoteType':
            return this.iconVoteTypeValidator(formControl);
        case 'versionVoteType':
            return this.versionVoteTypeValidator(formControl);
        case 'createdAtVoteType':
            return this.createdAtVoteTypeValidator(formControl);
        case 'modifiedAtVoteType':
            return this.modifiedAtVoteTypeValidator(formControl);


        case 'nameVotingTheme':
            return this.nameVotingThemeValidator(formControl);
        case 'descriptionVotingTheme':
            return this.descriptionVotingThemeValidator(formControl);
        case 'versionVotingTheme':
            return this.versionVotingThemeValidator(formControl);
        case 'createdAtVotingTheme':
            return this.createdAtVotingThemeValidator(formControl);
        case 'modifiedAtVotingTheme':
            return this.modifiedAtVotingThemeValidator(formControl);

        case 'nameVotingThemeItem':
            return this.nameVotingThemeItemValidator(formControl);
        case 'descriptionVotingThemeItem':
            return this.descriptionVotingThemeItemValidator(formControl);
        case 'orderNumberVotingThemeItem':
            return this.orderNumberVotingThemeItemValidator(formControl);
        case 'votingThemeIdVotingThemeItem':
            return this.votingThemeIdVotingThemeItemValidator(formControl);
        case 'versionVotingThemeItem':
            return this.versionVotingThemeItemValidator(formControl);
        case 'createdAtVotingThemeItem':
            return this.createdAtVotingThemeItemValidator(formControl);
        case 'modifiedAtVotingThemeItem':
            return this.modifiedAtVotingThemeItemValidator(formControl);



            default:
                return null;
        }
    }












    emailLoginValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 5;
        const max = 100;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');
        const emailAddressRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

            const emailValid = notEmptyRule && stringLengthRule && emailAddressRule;

            return emailValid ? null : { _ : this.translocoService.translate('NotEmptyLengthEmailAddress', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }


    textMessageValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 8000;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const textValid = notEmptyRule && stringLengthRule;

            return textValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    senderIdMessageValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const senderIdValid = notEmptyRule;

            return senderIdValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    versionMessageValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const versionValid = notEmptyRule;

            return versionValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    createdAtMessageValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const createdAtValid = notEmptyRule;

            return createdAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    modifiedAtMessageValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const modifiedAtValid = notEmptyRule;

            return modifiedAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }




    titleNotificationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 100;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const titleValid = notEmptyRule && stringLengthRule;

            return titleValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    descriptionNotificationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 400;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const descriptionValid = notEmptyRule && stringLengthRule;

            return descriptionValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    emailBodyNotificationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const min = 1;
        const max = 1000;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const emailBodyValid = stringLengthRule;

            return emailBodyValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    versionNotificationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const versionValid = notEmptyRule;

            return versionValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    createdAtNotificationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const createdAtValid = notEmptyRule;

            return createdAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    modifiedAtNotificationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const modifiedAtValid = notEmptyRule;

            return modifiedAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }



    namePermissionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 100;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const nameValid = notEmptyRule && stringLengthRule;

            return nameValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    nameLatinPermissionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 100;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const nameLatinValid = notEmptyRule && stringLengthRule;

            return nameLatinValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    descriptionPermissionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const min = 1;
        const max = 400;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const descriptionValid = stringLengthRule;

            return descriptionValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    descriptionLatinPermissionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const min = 1;
        const max = 400;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const descriptionLatinValid = stringLengthRule;

            return descriptionLatinValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    codePermissionValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 100;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const codeValid = notEmptyRule && stringLengthRule;

            return codeValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }





    emailRegistrationValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 5;
        const max = 100;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');
        const emailAddressRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

            const emailValid = notEmptyRule && stringLengthRule && emailAddressRule;

            return emailValid ? null : { _ : this.translocoService.translate('NotEmptyLengthEmailAddress', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }



    nameRoleValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 255;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const nameValid = notEmptyRule && stringLengthRule;

            return nameValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    descriptionRoleValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const min = 1;
        const max = 400;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const descriptionValid = stringLengthRule;

            return descriptionValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    versionRoleValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const versionValid = notEmptyRule;

            return versionValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    createdAtRoleValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const createdAtValid = notEmptyRule;

            return createdAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    modifiedAtRoleValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const modifiedAtValid = notEmptyRule;

            return modifiedAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }










    emailUserExtendedValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 5;
        const max = 70;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');
        const emailAddressRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

            const emailValid = notEmptyRule && stringLengthRule && emailAddressRule;

            return emailValid ? null : { _ : this.translocoService.translate('NotEmptyLengthEmailAddress', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    versionUserExtendedValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const versionValid = notEmptyRule;

            return versionValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    createdAtUserExtendedValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const createdAtValid = notEmptyRule;

            return createdAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    modifiedAtUserExtendedValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const modifiedAtValid = notEmptyRule;

            return modifiedAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }




    voteTypeIdUserExtendedVotingThemeItemValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const voteTypeIdValid = notEmptyRule;

            return voteTypeIdValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }






    verificationCodeVerificationTokenRequestValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const length = 6;
        const stringSingleLengthRule = (value?.length == length) || (typeof value === 'undefined' || value === null || value === '');

            const verificationCodeValid = notEmptyRule && stringSingleLengthRule;

            return verificationCodeValid ? null : { _ : this.translocoService.translate('NotEmptySingleLength', {length}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    emailVerificationTokenRequestValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 5;
        const max = 100;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');
        const emailAddressRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

            const emailValid = notEmptyRule && stringLengthRule && emailAddressRule;

            return emailValid ? null : { _ : this.translocoService.translate('NotEmptyLengthEmailAddress', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }

    nameVoteTypeValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 100;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const nameValid = notEmptyRule && stringLengthRule;

            return nameValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    iconVoteTypeValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 100;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const iconValid = notEmptyRule && stringLengthRule;

            return iconValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    versionVoteTypeValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const versionValid = notEmptyRule;

            return versionValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    createdAtVoteTypeValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const createdAtValid = notEmptyRule;

            return createdAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    modifiedAtVoteTypeValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const modifiedAtValid = notEmptyRule;

            return modifiedAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }


    nameVotingThemeValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 100;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const nameValid = notEmptyRule && stringLengthRule;

            return nameValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    descriptionVotingThemeValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const min = 1;
        const max = 1000;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const descriptionValid = stringLengthRule;

            return descriptionValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    versionVotingThemeValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const versionValid = notEmptyRule;

            return versionValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    createdAtVotingThemeValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const createdAtValid = notEmptyRule;

            return createdAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    modifiedAtVotingThemeValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const modifiedAtValid = notEmptyRule;

            return modifiedAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }

    nameVotingThemeItemValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';
        const min = 1;
        const max = 100;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const nameValid = notEmptyRule && stringLengthRule;

            return nameValid ? null : { _ : this.translocoService.translate('NotEmptyLength', {min, max}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    descriptionVotingThemeItemValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const min = 1;
        const max = 1000;
        const stringLengthRule = (value?.length >= min && value?.length <= max) || (typeof value === 'undefined' || value === null || value === '');

            const descriptionValid = stringLengthRule;

            return descriptionValid ? null : { _ : this.translocoService.translate('Length', {min, max}) };
        };

        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    orderNumberVotingThemeItemValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const orderNumberValid = notEmptyRule;

            return orderNumberValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    votingThemeIdVotingThemeItemValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const votingThemeIdValid = notEmptyRule;

            return votingThemeIdValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    versionVotingThemeItemValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const versionValid = notEmptyRule;

            return versionValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    createdAtVotingThemeItemValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const createdAtValid = notEmptyRule;

            return createdAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }
    modifiedAtVotingThemeItemValidator = (control: SpiderFormControl): SpiderValidatorFn => {
        const validator: SpiderValidatorFn = (): ValidationErrors | null => {
            const value = control.value;

        const notEmptyRule = typeof value !== 'undefined' && value !== null && value !== '';

            const modifiedAtValid = notEmptyRule;

            return modifiedAtValid ? null : { _ : this.translocoService.translate('NotEmpty', {}) };
        };
        validator.hasNotEmptyRule = true;
        control.required = true;
        control.validator = validator;
        // TODO FT: When you improve generated code, and could realize on the backend is this property of the Date type, generate this line only for Date form controls.
        control.updateValueAndValidity(); // FT: It's necessary for Date angular type
        return validator;
    }




}

