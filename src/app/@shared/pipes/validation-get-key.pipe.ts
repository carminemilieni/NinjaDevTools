import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { environment } from '@env';

@Pipe({
  name: 'validationGetKey',
})
export class ValidationGetKeyPipe implements PipeTransform {
  /**
   * @description
   * A pipe that transforms a validation error object into a key.
   *
   * @usageNotes
   * ```html
   * {{ errors | validationGetKey | translate: (errors | validationGetParams) }}
   * ```
   *
   * @param value - Object Error
   * @param prefix - Prefix of the translation key
   * @returns string of the translation key
   */
  transform(value: TValue, prefix?: string): string {
    let { prefixOfFormValidationKeys } = environment.languageOptions;

    if (prefix) {
      prefixOfFormValidationKeys = prefix;
    }

    if (!prefixOfFormValidationKeys) {
      prefixOfFormValidationKeys = 'validation';
    }

    return this.#wrapWithPrefix(value, prefixOfFormValidationKeys);
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
   * @returns The key of the object with a translation prefix.
   */
  #wrapWithPrefix(value: TValue, prefix: string): string {
    const key = this.#returnKey(value);

    return `${prefix}.${key}`;
  }
}

type TValue = ValidationErrors | null;
