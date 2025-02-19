import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Panel } from 'primeng/panel';
import { IQrDotOptionsFormControls } from '../qr-code.type';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { DOT_TYPES } from '@pages/generators/qr-code/qr-config.form';
import { TranslatePipe } from '@ngx-translate/core';
import { FloatLabel } from 'primeng/floatlabel';
import { ColorPickerModule } from 'primeng/colorpicker';
import { SelectButtonModule } from 'primeng/selectbutton';
import { GradientFormComponent } from './gradient-form.component';

@Component({
  selector: 'app-dot-options-form',
  imports: [
    Panel,
    ReactiveFormsModule,
    Select,
    TranslatePipe,
    FloatLabel,
    ColorPickerModule,
    SelectButtonModule,
    GradientFormComponent,
  ],
  templateUrl: './dot-options-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DotOptionsFormComponent {
  readonly form = input<FormGroup<IQrDotOptionsFormControls> | null>(null);
  protected readonly DotTypeOpts = DOT_TYPES;
  protected readonly i18nPrefix = 'pages.qr-code.form.dotOptions';
}
