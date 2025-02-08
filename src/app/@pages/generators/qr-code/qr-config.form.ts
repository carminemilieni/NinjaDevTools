import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  IQrConfigFormControls,
  IQRDotOptions,
  IQrDotOptionsFormControls,
  TQrConfigFormGroup,
  TQrConfigFormValues,
} from '@pages/generators/qr-code/qr-code.type';
import { Observable, tap } from 'rxjs';

/**
 * @description
 * A form for configuring a QR code.
 *
 * @example
 * ```ts
 * const { form, handlers$ } = QrConfigForm({..});
 * const formGroup = form;
 * handlers$.forEach((h) => h.subscribe());
 * ```
 *
 * @param initialValues
 * @returns The form and its handlers.
 */
export default (
  initialValues: Partial<TQrConfigFormValues>
): {
  form: TQrConfigFormGroup;
  handlers$: Observable<any>[];
} => {
  const nonNullable = true;

  const dotsOptions = dotOptionsFormGroupFactory(initialValues.dotsOptions ?? {});

  const form = new FormGroup<IQrConfigFormControls>({
    width: new FormControl(initialValues.width ?? 0, {
      nonNullable,
      validators: [Validators.required, Validators.min(10), Validators.max(2000)],
    }),
    height: new FormControl(initialValues.height ?? 0, {
      nonNullable,
    }),
    data: new FormControl(initialValues.data, {
      nonNullable,
      validators: [Validators.required],
    }),
    image: new FormControl(initialValues.image, {
      nonNullable,
    }),
    margin: new FormControl(initialValues.margin, {
      nonNullable,
      validators: [Validators.required, Validators.min(0), Validators.max(100)],
    }),
    dotsOptions,
  });

  const handlers$: Observable<any>[] = [];

  handlers$.push(dimensionHandler$(form.controls.width, form.controls.height));

  return {
    form,
    handlers$,
  };
};

/**
 * @description
 * Handles the width and height dimensions of the QR code.
 * When the width changes, the height is set to the same value.
 * The output is a square QR code.
 *
 * @param widthCtrl
 * @param heightCtrl
 */
const dimensionHandler$ = (
  widthCtrl: TQrConfigFormGroup['controls']['width'],
  heightCtrl: TQrConfigFormGroup['controls']['height']
): Observable<TQrConfigFormValues['width']> => widthCtrl.valueChanges.pipe(tap((width) => heightCtrl.setValue(width)));

const dotOptionsFormGroupFactory = (initialValue: IQRDotOptions) => {
  return new FormGroup<IQrDotOptionsFormControls>({
    color: new FormControl(initialValue.color, {
      nonNullable: true,
    }),
    type: new FormControl(initialValue.type, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    gradient: new FormControl(initialValue.gradient, {
      nonNullable: true,
    }),
  });
};

export const DOT_TYPES = ['dots', 'rounded', 'classy', 'classy-rounded', 'square', 'extra-rounded'];
