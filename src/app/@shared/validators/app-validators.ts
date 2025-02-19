import { AbstractControl, FormArray, Validators } from '@angular/forms';

export class AppValidators extends Validators {
  /**
   * @description
   * A validator function that checks if the length of the array is within the specified range.
   *
   * @usageNotes
   *
   * ### Validate the length of an array is within a range of 2 to 5
   *
   * ```typescript
   * const formArray = new FormArray([], AppValidators.minMaxArrayLengthValidator(2, 5));
   *
   * console.log(formArray.errors); // { arrayLength: { valid: false, min: 2, max: 5, actual: 0 } }
   *
   * @param min - minimum length of the array
   * @param max - maximum length of the array
   * @returns A validator function that checks if the length of the array is within the specified range.
   */
  static minMaxArrayLengthValidator(min: number, max: number) {
    return (ctrl: AbstractControl) => {
      if (!(ctrl instanceof FormArray)) {
        throw new Error('minMaxArrayLengthValidator can only be used on FormArray');
      }
      const formArray = ctrl as FormArray;
      const length = formArray.controls.length;
      if (length < min || length > max) {
        return { arrayLength: { valid: false, min, max, actual: length } };
      }
      return null;
    };
  }
}
