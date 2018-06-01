import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export class CustomValidators {

  static greaterThanOrEqualTo(limit: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      return control.value < limit ? { 'tooSmall': 'Value must be greater than or equal to ' + limit } : null;
    };
  }

  static validTel(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      return !control.value ? null : /[0-9]/.test(control.value) ? null : { 'notValidTel': 'Value must be valid tele-phone number' };
    };
  }

  static alphaNumericOnly(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      return !control.value ? null : /^[A-Za-z0-9_\s]*$/.test(control.value) ? null : { 'alphaNumericOnly': 'Allowed characters are a-zA-Z0-9_\s' };
    };
  }

  static checkCharacterLimit(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: string } | null => {
      return !control.value ? null : control.value.length >= min && control.value.length <= max ? null : { 'lengthError': 'Use between ' + min + ' and ' + max + ' characters' };
    };
  }

  static nanpa(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      return !control.value ? null : /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(control.value) ? null : { 'notValidNumber': 'Value must be a valid telephone(NANPA) number' };
    };
  }

  static notValidUrl(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      return !control.value ? null : /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(control.value) ?
        null : { 'notValidUrl': 'Please enter valid url e.g. google.com' };
    };
  }

}
