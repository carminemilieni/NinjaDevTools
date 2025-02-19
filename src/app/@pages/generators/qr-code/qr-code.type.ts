import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CornerDotType, CornerSquareType, DotType, Gradient, Options as QROptions } from 'ngx-qrcode-styling';

export type TQROptions = QROptions & {
  dotsOptions: IQRDotOptions;
  cornersSquareOptions: IQrCornersSquareOptions;
  cornersDotOptions: IQrCornersDotOptions;
  backgroundOptions: IQrBackgroundOptions;
};

export interface IQrConfigFormControls {
  width: FormControl<TQROptions['width']>;
  height: FormControl<TQROptions['height']>;
  data: FormControl<TQROptions['data']>;
  image: FormControl<TQROptions['image']>;
  margin: FormControl<TQROptions['margin']>;
  dotsOptions: FormGroup<IQrDotOptionsFormControls>;
  cornersSquareOptions: FormGroup<IQrCornersSquareOptionsFormControls>;
  cornersDotOptions: FormGroup<IQrCornersDotOptionsFormControls>;
  backgroundOptions: FormGroup<IQrBackgroundOptionsFormControls>;
}

export type TQrConfigFormGroup = FormGroup<IQrConfigFormControls>;
export type TQrConfigFormValues = TQrConfigFormGroup['value'] & TQROptions;

/**
 * Dot Options
 */
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

/**
 * Corners Square Options
 */

export interface IQrCornersSquareOptions {
  type: CornerSquareType;
  color: string;
  gradient: Gradient;
}

export interface IQrCornersSquareOptionsFormControls {
  color: FormControl<IQrCornersSquareOptions['color']>;
  type: FormControl<IQrCornersSquareOptions['type']>;
  gradient: FormGroup<IQrGradientFormControls>;
}

export type TQRCornersSquareOptionsFormGroup = FormGroup<IQrCornersSquareOptionsFormControls>;
export type TQRCornersSquareOptionsFormValues = TQRCornersSquareOptionsFormGroup['value'];

/**
 * Corners Dot Options
 */
export interface IQrCornersDotOptions {
  type: CornerDotType;
  color: string;
  gradient: Gradient;
}

export interface IQrCornersDotOptionsFormControls {
  color: FormControl<IQrCornersDotOptions['color']>;
  type: FormControl<IQrCornersDotOptions['type']>;
  gradient: FormGroup<IQrGradientFormControls>;
}

export type TQRCornersDotOptionsFormGroup = FormGroup<IQrCornersDotOptionsFormControls>;
export type TQRCornersDotOptionsFormValues = TQRCornersDotOptionsFormGroup['value'];

/**
 * Background
 */
export interface IQrBackgroundOptions {
  round: number;
  color: string;
  gradient: Gradient;
}

export interface IQrBackgroundOptionsFormControls {
  round: FormControl<IQrBackgroundOptions['round']>;
  color: FormControl<IQrBackgroundOptions['color']>;
  gradient: FormGroup<IQrGradientFormControls>;
}

export type TQRBackgroundOptionsFormGroup = FormGroup<IQrBackgroundOptionsFormControls>;
export type TQRBackgroundOptionsFormValues = TQRBackgroundOptionsFormGroup['value'];

/**
 * Gradient
 */
export interface IQrGradientFormControls {
  type: FormControl<Gradient['type']>;
  rotation: FormControl<Gradient['rotation']>;
  colorStops: FormArray<FormGroup<IQrColorStopFormControls>>;
}

export type TQRGradientFormGroup = FormGroup<IQrGradientFormControls>;
export type TQRGradientFormValues = TQRGradientFormGroup['value'] & Gradient;
export interface IQrColorStopFormControls {
  offset: FormControl<Gradient['colorStops'][0]['offset']>;
  color: FormControl<Gradient['colorStops'][0]['color']>;
}

export type TQRColorStopFormGroup = FormGroup<IQrColorStopFormControls>;
export type TQRColorStopFormValues = TQRColorStopFormGroup['value'] & Gradient['colorStops'][0];

export interface IQrPageState {
  panelCollapsed: {
    mainOptions: boolean;
    dotsOptions: boolean;
    cornersSquareOptions: boolean;
    cornersDotOptions: boolean;
    backgroundOptions: boolean;
  };
}
