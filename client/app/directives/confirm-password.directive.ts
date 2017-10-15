import { Directive } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appConfirmPassword]',
  providers: [{provide: NG_VALIDATORS, useExisting: ConfirmPasswordDirective, multi: true}]
})
export class ConfirmPasswordDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl): {[key: string]: any} {
    return null;
  }

}
