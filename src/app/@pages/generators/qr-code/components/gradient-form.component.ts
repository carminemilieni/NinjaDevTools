import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'primeng/colorpicker';
import { IQrGradientFormControls } from '../qr-code.type';
import { SelectButtonModule } from 'primeng/selectbutton';
import { GRADIENT_TYPES, gradientColorStopFormGroupFactory, ValidationConstraints } from '../qr-config.form';
import { Fieldset } from 'primeng/fieldset';
import { TranslatePipe } from '@ngx-translate/core';
import { SliderModule } from 'primeng/slider';
import { v4 as uuid } from 'uuid';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-gradient-form',
  imports: [
    CommonModule,
    ColorPickerModule,
    SelectButtonModule,
    ReactiveFormsModule,
    Fieldset,
    TranslatePipe,
    SliderModule,
    ButtonModule,
  ],
  templateUrl: './gradient-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradientFormComponent {
  protected readonly componentID = uuid();
  protected readonly i18nPrefix = 'pages.qr-code.form.gradient';
  protected readonly ValidationConstraints = ValidationConstraints;
  readonly form = input<FormGroup<IQrGradientFormControls> | null>(null);
  protected readonly gradientTypeOpts = GRADIENT_TYPES;

  addStop(fg: FormGroup<IQrGradientFormControls>) {
    const colorStop = gradientColorStopFormGroupFactory();
    fg.controls.colorStops.push(colorStop);
  }

  removeStop(fg: FormGroup<IQrGradientFormControls>) {
    fg.controls.colorStops.removeAt(fg.controls.colorStops.length - 1);
  }
}
