import {FormGroup, ValidatorFn, ValidationErrors, AbstractControl, FormControl} from '@angular/forms';

export function confirmPasswordValidator(lesh: FormControl) {
  let error = { 'isValid': false };
  if (lesh.value == '')
    return null;
  console.log("CpV: ", lesh.parent.controls['password'].value);
  if (lesh.parent.get('password').value == lesh.parent.get('confirmPassword').value) {
    lesh.parent.get('password').setErrors(null);
    lesh.parent.get('confirmPassword').setErrors(null);
    return null; 
  }
  else
    return error;
}
