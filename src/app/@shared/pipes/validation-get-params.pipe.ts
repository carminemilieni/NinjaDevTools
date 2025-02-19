import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'validationGetParams',
})
export class ValidationGetParamsPipe implements PipeTransform {
  /**
   * @description
   * A pipe that transforms a validation error object into a parameter.
   *
   * @usageNotes
   * ```html
   * {{ errors | validationGetKey | translate: (errors | validationGetParams) }}
   * ```
   *
   * @param value - Object Error
   * @returns object of the key
   */
  transform(value: TValue): object {
    return this.#returnParam(value);
  }

  /**
   * @returns The key of the object.
   */
  #returnKey(value: TValue): string | null {
    if (!value || typeof value !== 'object') {
      return null;
    }

    return Object.keys(value)[0];
  }

  /**
   * @returns The object of the key.
   */
  #returnParam(value: TValue): object {
    const key = this.#returnKey(value);

    if (!key || value === null) {
      return {};
    }

    const obj = value[key];

    if (!obj || typeof obj !== 'object') {
      return {};
    }
    return obj;
  }
}

type TValue = ValidationErrors | null;
