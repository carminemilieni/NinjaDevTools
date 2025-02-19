import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { ColorPickerModule } from 'primeng/colorpicker';
import { FloatLabel } from 'primeng/floatlabel';
import { Panel } from 'primeng/panel';
import { Select } from 'primeng/select';
import { SelectButtonModule } from 'primeng/selectbutton';
import { GradientFormComponent } from './gradient-form.component';
import { IQrBackgroundOptionsFormControls } from '../qr-code.type';

@Component({
  selector: 'app-background-options-form',
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
  templateUrl: './background-options-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackgroundOptionsFormComponent {
  readonly form = input<FormGroup<IQrBackgroundOptionsFormControls> | null>(null);
  protected readonly i18nPrefix = 'pages.qr-code.form.backgroundOptions';
}
