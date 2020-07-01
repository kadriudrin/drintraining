import {FormGroup, ValidatorFn, ValidationErrors, AbstractControl} from '@angular/forms';

export function confirmPasswordValidator(control) {
  console.log("control: ", control);
  // both of the .get are null
  return control.get('name').value == control.get('surname').value ? null : { 'isValid': true };
}
