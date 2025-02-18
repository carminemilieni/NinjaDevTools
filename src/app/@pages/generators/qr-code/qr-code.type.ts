import { FormControl, FormGroup } from '@angular/forms';
import { DotType, Gradient, Options as QROptions } from 'ngx-qrcode-styling';

export type TQROptions = QROptions & {
  dotsOptions: IQRDotOptions;
};

export interface IQrConfigFormControls {
  width: FormControl<TQROptions['width']>;
  height: FormControl<TQROptions['height']>;
  data: FormControl<TQROptions['data']>;
  image: FormControl<TQROptions['image']>;
  margin: FormControl<TQROptions['margin']>;
  dotsOptions: FormGroup<IQrDotOptionsFormControls>;
}

export type TQrConfigFormGroup = FormGroup<IQrConfigFormControls>;
export type TQrConfigFormValues = TQrConfigFormGroup['value'] & TQROptions;

export interface IQRDotOptions {
  type: DotType;
  color: string;
  gradient: Gradient;
}

export interface IQrDotOptionsFormControls {
  color: FormControl<IQRDotOptions['color']>;
  type: FormControl<IQRDotOptions['type']>;
  gradient: FormGroup<IQrGradientFormControls>;
}

export type TQRCommonOptionsFormGroup = FormGroup<IQrDotOptionsFormControls>;
export type TQRDotOptionsFormValues = TQRCommonOptionsFormGroup['value'];

export interface IQrGradientFormControls {
  type: FormControl<Gradient['type']>;
  rotation: FormControl<Gradient['rotation']>;
  colorStops: FormControl<Gradient['colorStops']>;
}

export type TQRGradientFormGroup = FormGroup<IQrGradientFormControls>;
export type TQRGradientFormValues = TQRGradientFormGroup['value'] & Gradient;
