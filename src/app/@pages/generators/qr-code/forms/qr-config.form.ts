import { FormControl, FormGroup } from '@angular/forms';
import {
  IDimensionChangeEffect,
  IQrConfigFormControls,
  TQrConfigFormGroup,
  TQrConfigFormValues,
} from '@pages/generators/qr-code/qr-code.type';
import { map, merge, Observable, pairwise, startWith, tap } from 'rxjs';

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
  const form = new FormGroup<IQrConfigFormControls>({
    width: new FormControl(initialValues.width ?? 0, {
      nonNullable,
    }),
    height: new FormControl(initialValues.height ?? 0, {
      nonNullable,
    }),
    lockProportions: new FormControl(initialValues.lockProportions ?? true, {
      nonNullable,
    }),
    data: new FormControl(initialValues.data, {
      nonNullable,
    }),
    image: new FormControl(initialValues.image, {
      nonNullable,
    }),
    margin: new FormControl(initialValues.margin, {
      nonNullable,
    }),
  });

  const handlers$: Observable<any>[] = [];

  handlers$.push(dimensionHandler$(form.controls.lockProportions, form.controls.width, form.controls.height));

  return {
    form,
    handlers$,
  };
};

/**
 * @description
 * A handler for dimension changes.
 * If the lockProportions control is true,
 * the width and height are updated to maintain the same aspect ratio.
 *
 * @param lockProportionsCtrl The control that locks the proportions.
 * @param widthCtrl The control for the width.
 * @param heightCtrl The control for the height.
 * @returns An observable that emits when the dimensions change.
 */
const dimensionHandler$ = (
  lockProportionsCtrl: TQrConfigFormGroup['controls']['lockProportions'],
  widthCtrl: TQrConfigFormGroup['controls']['width'],
  heightCtrl: TQrConfigFormGroup['controls']['height']
): Observable<IDimensionChangeEffect> =>
  merge(
    heightCtrl.valueChanges.pipe(
      startWith(heightCtrl.value),
      pairwise(),
      map(
        (arr) =>
          ({
            h: {
              prev: arr[0],
              curr: arr[1],
            },
          }) as IDimensionChangeEffect
      )
    ),
    widthCtrl.valueChanges.pipe(
      startWith(widthCtrl.value),
      pairwise(),
      map(
        (arr) =>
          ({
            w: {
              prev: arr[0],
              curr: arr[1],
            },
          }) as IDimensionChangeEffect
      )
    )
  ).pipe(
    tap((res) => {
      const width = widthCtrl.value;
      const height = heightCtrl.value;
      if (lockProportionsCtrl.value) {
        if (res.h) {
          widthCtrl.setValue(width + (res.h.curr - res.h.prev), { emitEvent: false });
        }
        if (res.w) {
          heightCtrl.setValue(height + (res.w.curr - res.w.prev), { emitEvent: false });
        }
      }
    })
  );
