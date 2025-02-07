import { Options as QROptions } from 'ngx-qrcode-styling';
import { FormControl, FormGroup } from '@angular/forms';

export type TQROptions = QROptions & {
  width: number;
  height: number;
  lockProportions: boolean;
};

export interface IQrConfigFormControls {
  width: FormControl<TQROptions['width']>;
  height: FormControl<TQROptions['height']>;
  lockProportions: FormControl<TQROptions['lockProportions']>;
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

export interface IDimensionChangeEffect {
  w?: IWHValueChanges;
  h?: IWHValueChanges;
}
