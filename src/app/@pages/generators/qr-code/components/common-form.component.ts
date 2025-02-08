import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Panel } from 'primeng/panel';
import { IQrDotOptionsFormControls } from '../qr-code.type';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { DOT_TYPES } from '@pages/generators/qr-code/qr-config.form';
import { TranslatePipe } from '@ngx-translate/core';
import { FloatLabel } from 'primeng/floatlabel';
import { ColorPickerModule } from 'primeng/colorpicker';
import { Fieldset } from 'primeng/fieldset';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-common-form',
  imports: [
    Panel,
    ReactiveFormsModule,
    Select,
    TranslatePipe,
    FloatLabel,
    ColorPickerModule,
    Fieldset,
    SelectButtonModule,
  ],
  templateUrl: './common-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommonFormComponent {
  readonly form = input<FormGroup<IQrDotOptionsFormControls> | null>(null);
  protected readonly FormGroup = FormGroup;
  protected readonly DotTypeOpts = DOT_TYPES;
  protected readonly i18nPrefix = 'pages.qr-code.form.dotOptions';
  protected readonly Select = Select;
}
