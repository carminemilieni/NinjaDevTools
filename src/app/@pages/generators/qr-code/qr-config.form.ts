import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  IQrColorStopFormControls,
  IQrConfigFormControls,
  IQRDotOptions,
  IQrDotOptionsFormControls,
  IQrGradientFormControls,
  TQrConfigFormGroup,
  TQrConfigFormValues,
} from '@pages/generators/qr-code/qr-code.type';
import { Gradient, GradientType } from 'ngx-qrcode-styling';
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
  initialValues: TQrConfigFormValues
): {
  form: TQrConfigFormGroup;
  handlers$: Observable<any>[];
} => {
  const nonNullable = true;

  const dotsOptions = dotOptionsFormGroupFactory(initialValues.dotsOptions);

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
  const gradient = gradientFormGroupFactory(initialValue.gradient);
  return new FormGroup<IQrDotOptionsFormControls>({
    color: new FormControl(initialValue.color, {
      nonNullable: true,
    }),
    type: new FormControl(initialValue.type, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    gradient,
  });
};

export const DOT_TYPES = ['dots', 'rounded', 'classy', 'classy-rounded', 'square', 'extra-rounded'];

const gradientFormGroupFactory = (initialValue: Gradient) => {
  const colorStops = new FormArray<FormGroup<IQrColorStopFormControls>>([]);

  initialValue.colorStops.forEach((stop) => {
    colorStops.push(gradientColorStopFormGroupFactory(stop));
  });

  return new FormGroup<IQrGradientFormControls>({
    type: new FormControl(initialValue.type, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    rotation: new FormControl(initialValue?.rotation, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0), Validators.max(360)],
    }),
    colorStops,
  });
};

export const GRADIENT_TYPES: GradientType[] = ['linear', 'radial'];

const gradientColorStopFormGroupFactory = (initialValue: Gradient['colorStops'][0]) => {
  return new FormGroup<IQrColorStopFormControls>({
    offset: new FormControl(initialValue.offset, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0), Validators.max(1)],
    }),
    color: new FormControl(initialValue.color, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
};
