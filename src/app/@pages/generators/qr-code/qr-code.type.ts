import { Options as QROptions } from 'ngx-qrcode-styling';
import { FormControl, FormGroup } from '@angular/forms';

export type TQROptions = QROptions;

export interface IQrConfigFormControls {
  width: FormControl<TQROptions['width']>;
  height: FormControl<TQROptions['height']>;
  data: FormControl<TQROptions['data']>;
  image: FormControl<TQROptions['image']>;
  margin: FormControl<TQROptions['margin']>;
}

export type TQrConfigFormGroup = FormGroup<IQrConfigFormControls>;

export type TQrConfigFormValues = TQrConfigFormGroup['value'] & TQROptions;

export interface IWHValueChanges {
  prev: number;
  curr: number;
}
