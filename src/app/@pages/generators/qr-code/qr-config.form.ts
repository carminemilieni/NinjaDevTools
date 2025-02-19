import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { AppValidators } from '@app/@shared/validators';
import {
  IQrColorStopFormControls,
  IQrConfigFormControls,
  IQrCornersDotOptions,
  IQrCornersDotOptionsFormControls,
  IQrCornersSquareOptions,
  IQrCornersSquareOptionsFormControls,
  IQRDotOptions,
  IQrDotOptionsFormControls,
  IQrGradientFormControls,
  TQrConfigFormGroup,
  TQrConfigFormValues,
} from '@pages/generators/qr-code/qr-code.type';
import { CornerDotType, CornerSquareType, DotType, Gradient, GradientType } from 'ngx-qrcode-styling';
import { distinctUntilChanged, map, Observable, tap } from 'rxjs';

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

  const cornersSquareOptions = cornersSquareOptionsFormGroupFactory(initialValues.cornersSquareOptions);

  const cornersDotOptions = cornersDotOptionsFormGroupFactory(initialValues.cornersDotOptions);

  const form = new FormGroup<IQrConfigFormControls>({
    width: new FormControl(initialValues.width ?? 0, {
      nonNullable,
      validators: [
        AppValidators.required,
        AppValidators.min(ValidationConstraints.WidthMin),
        AppValidators.max(ValidationConstraints.WidthMax),
      ],
    }),
    height: new FormControl(initialValues.height ?? 0, {
      nonNullable,
      validators: [
        AppValidators.required,
        AppValidators.min(ValidationConstraints.HeightMin),
        AppValidators.max(ValidationConstraints.HeightMax),
      ],
    }),
    data: new FormControl(initialValues.data, {
      nonNullable,
      validators: [AppValidators.required],
    }),
    image: new FormControl(initialValues.image, {
      nonNullable,
    }),
    margin: new FormControl(initialValues.margin, {
      nonNullable,
      validators: [
        AppValidators.required,
        AppValidators.min(ValidationConstraints.MarginMin),
        AppValidators.max(ValidationConstraints.MarginMax),
      ],
    }),
    dotsOptions,
    cornersSquareOptions,
    cornersDotOptions,
  });

  const handlers$: Observable<any>[] = [];

  handlers$.push(
    dimensionHandler$(form.controls.width, form.controls.height),
    colorStopsOffsetHandler$(dotsOptions.controls.gradient.controls.colorStops)
  );

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
      validators: [AppValidators.required],
    }),
    gradient,
  });
};

export const DOT_TYPES: DotType[] = ['dots', 'rounded', 'classy', 'classy-rounded', 'square', 'extra-rounded'];

const cornersSquareOptionsFormGroupFactory = (initialValue: IQrCornersSquareOptions) => {
  const gradient = gradientFormGroupFactory(initialValue.gradient);
  return new FormGroup<IQrCornersSquareOptionsFormControls>({
    color: new FormControl(initialValue.color, {
      nonNullable: true,
    }),
    type: new FormControl(initialValue.type, {
      nonNullable: true,
      validators: [AppValidators.required],
    }),
    gradient,
  });
};

export const CORNERS_SQUARE_TYPES: CornerSquareType[] = ['dot', 'square', 'extra-rounded'];

const cornersDotOptionsFormGroupFactory = (initialValue: IQrCornersDotOptions) => {
  const gradient = gradientFormGroupFactory(initialValue.gradient);
  return new FormGroup<IQrCornersDotOptionsFormControls>({
    color: new FormControl(initialValue.color, {
      nonNullable: true,
    }),
    type: new FormControl(initialValue.type, {
      nonNullable: true,
      validators: [AppValidators.required],
    }),
    gradient,
  });
};

export const CORNERS_DOT_TYPES: CornerDotType[] = ['dot', 'square'];

const gradientFormGroupFactory = (initialValue: Gradient) => {
  const colorStops = new FormArray<FormGroup<IQrColorStopFormControls>>([], {
    validators: [
      AppValidators.minMaxArrayLengthValidator(
        ValidationConstraints.ColorStopsMinLength,
        ValidationConstraints.ColorStopsMaxLength
      ),
    ],
  });

  initialValue.colorStops.forEach((stop) => {
    colorStops.push(gradientColorStopFormGroupFactory(stop));
  });

  return new FormGroup<IQrGradientFormControls>({
    type: new FormControl(initialValue.type, {
      nonNullable: true,
      validators: [AppValidators.required],
    }),
    rotation: new FormControl(initialValue?.rotation, {
      nonNullable: true,
      validators: [
        AppValidators.required,
        AppValidators.min(ValidationConstraints.RotationMin),
        AppValidators.max(ValidationConstraints.RotationMax),
      ],
    }),
    colorStops,
  });
};

/**
 * @description
 * Handles the offset of the color stops in a gradient.
 * The offset is calculated based on the number of color stops.
 * The offset is set to a value between 0 and 1.
 * The offset is evenly distributed between the color stops.
 *
 * @param colorStops
 */
const colorStopsOffsetHandler$ = (colorStops: FormArray<FormGroup<IQrColorStopFormControls>>) => {
  return colorStops.valueChanges.pipe(
    map(() => colorStops.length),
    distinctUntilChanged(),
    tap((length) => {
      const step = 1 / (length - 1);
      colorStops.controls.forEach((control, index) => {
        control.controls.offset.setValue(index * step);
      });
    })
  );
};

export const GRADIENT_TYPES: GradientType[] = ['linear', 'radial'];

export const gradientColorStopFormGroupFactory = (value?: Gradient['colorStops'][0]) => {
  const initialValue =
    value ??
    ({
      offset: 1,
      color: '#000000',
    } as Gradient['colorStops'][0]);
  return new FormGroup<IQrColorStopFormControls>({
    offset: new FormControl(initialValue.offset, {
      nonNullable: true,
      validators: [
        AppValidators.required,
        AppValidators.min(ValidationConstraints.ColorStopMin),
        AppValidators.max(ValidationConstraints.ColorStopMax),
      ],
    }),
    color: new FormControl(initialValue.color, {
      nonNullable: true,
      validators: [AppValidators.required],
    }),
  });
};

export const ValidationConstraints = {
  WidthMin: 10,
  WidthMax: 2000,
  HeightMin: 10,
  HeightMax: 2000,
  MarginMin: 0,
  MarginMax: 100,
  RotationMin: 0,
  RotationMax: 360,
  ColorStopMin: 0,
  ColorStopMax: 1,
  ColorStopsMinLength: 1,
  ColorStopsMaxLength: 4,
};
