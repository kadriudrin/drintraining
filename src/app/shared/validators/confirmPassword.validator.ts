import {FormGroup, ValidatorFn, ValidationErrors, AbstractControl, FormControl} from '@angular/forms';

// you can rename this as a matcher function because it just matches things for the form.
export function confirmPasswordValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({confirmedValidator: true});
    } else {
      matchingControl.setErrors(null);
    }
  };
}

// Handle Validation for all the forms in the group.
// You can use this in multiple ways...
export function getFormValidationErrors(form) {
  Object.keys(form.controls).forEach(key => {
    const controlErrors: ValidationErrors = form.get(key).errors;
    if (controlErrors != null) {
      Object.keys(controlErrors).forEach(keyError => {
        // Display error here keys.!
        // or make callback return so you can display the error in an mat error field.
        alert(key);
      });
    }
  });
}

