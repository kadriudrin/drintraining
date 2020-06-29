import {FormGroup, AbstractControl, ValidationErrors} from '@angular/forms'

export function confirmPassword(fg: FormGroup): {[key: string]: any} | null {
  console.log("ConfirmPW Validation");
  return fg.get('password') == fg.get('confirmPassword') ? null : { isValid: false };
}
