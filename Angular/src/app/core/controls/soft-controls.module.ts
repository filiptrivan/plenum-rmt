import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SoftPanelsModule } from '../components/soft-panels/soft-panels.module';
import { SoftReturnButtonComponent } from '../components/soft-buttons/soft-return-button.component';
import { SoftMultiAutocompleteComponent } from './soft-multiautocomplete/soft-multiautocomplete.component';
import { SoftPasswordComponent } from './soft-password/soft-password.component';
import { SoftTextboxComponent } from './soft-textbox/soft-textbox.component';
import { SoftCheckboxComponent } from './soft-checkbox/soft-checkbox.component';
import { SoftMultiselectComponent } from './soft-multiselect/soft-multiselect.component';
import { SoftTextareaComponent } from './soft-textarea/soft-textarea.component';
import { SoftNumberComponent } from './soft-number/soft-number.component';
import { SoftDropdownComponent } from './soft-dropdown/soft-dropdown.component';
import { SoftEditorComponent } from './soft-editor/soft-editor.component';
import { SoftColorpickComponent } from './soft-colorpick/soft-colorpick.component';
import { SoftFileComponent } from './soft-file/soft-file.component';
import { SoftCalendarComponent } from './soft-calendar/soft-calendar.component';
import { SoftAutocompleteComponent } from './soft-autocomplete/soft-autocomplete.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SoftTextboxComponent,
    SoftTextareaComponent,
    SoftCheckboxComponent,
    SoftCalendarComponent,
    SoftReturnButtonComponent,
    SoftPanelsModule,
    SoftPasswordComponent,
    SoftAutocompleteComponent,
    SoftMultiAutocompleteComponent,
    SoftMultiselectComponent,
    SoftNumberComponent,
    SoftDropdownComponent,
    SoftEditorComponent,
    SoftColorpickComponent,
    SoftFileComponent,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SoftTextboxComponent,
    SoftTextareaComponent,
    SoftCheckboxComponent,
    SoftCalendarComponent,
    SoftReturnButtonComponent,
    SoftPanelsModule,
    SoftPasswordComponent,
    SoftAutocompleteComponent,
    SoftMultiAutocompleteComponent,
    SoftMultiselectComponent,
    SoftNumberComponent,
    SoftDropdownComponent,
    SoftEditorComponent,
    SoftColorpickComponent,
    SoftFileComponent
  ],
  declarations: [
  ],
  providers: [
  ]
})
export class SoftControlsModule {}