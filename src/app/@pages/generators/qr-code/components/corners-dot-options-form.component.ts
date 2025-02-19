import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { ColorPickerModule } from 'primeng/colorpicker';
import { FloatLabel } from 'primeng/floatlabel';
import { Panel } from 'primeng/panel';
import { Select } from 'primeng/select';
import { SelectButtonModule } from 'primeng/selectbutton';
import { GradientFormComponent } from './gradient-form.component';
import { IQrCornersDotOptionsFormControls } from '../qr-code.type';
import { CORNERS_DOT_TYPES } from '../qr-config.form';
import { QrCodeStore } from '../qr-code.store';

@Component({
  selector: 'app-corners-dot-options-form',
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
  templateUrl: './corners-dot-options-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CornersDotOptionsFormComponent {
  readonly form = input<FormGroup<IQrCornersDotOptionsFormControls> | null>(null);
  protected readonly CornerDotTypeOpts = CORNERS_DOT_TYPES;
  protected readonly i18nPrefix = 'pages.qr-code.form.cornersDotOptions';
  readonly #store = inject(QrCodeStore);
  protected readonly collapsed = this.#store.pageState.panelCollapsed.cornersDotOptions;

  setCollapsed(value: boolean) {
    this.#store.setCollapsed('cornersDotOptions', value);
  }
}
