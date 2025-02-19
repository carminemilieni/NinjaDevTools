import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { ColorPickerModule } from 'primeng/colorpicker';
import { FloatLabel } from 'primeng/floatlabel';
import { Panel } from 'primeng/panel';
import { Select } from 'primeng/select';
import { SelectButtonModule } from 'primeng/selectbutton';
import { GradientFormComponent } from './gradient-form.component';
import { IQrCornersSquareOptionsFormControls } from '../qr-code.type';
import { CORNERS_SQUARE_TYPES } from '../qr-config.form';
import { QrCodeStore } from '../qr-code.store';

@Component({
  selector: 'app-corner-square-options-form',
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
  templateUrl: './corners-square-options-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CornersSquareOptionsFormComponent {
  readonly form = input<FormGroup<IQrCornersSquareOptionsFormControls> | null>(null);
  protected readonly CornerSquareTypeOpts = CORNERS_SQUARE_TYPES;
  protected readonly i18nPrefix = 'pages.qr-code.form.cornersSquareOptions';
  readonly #store = inject(QrCodeStore);
  protected readonly collapsed = this.#store.pageState.panelCollapsed.cornersSquareOptions;

  setCollapsed(value: boolean) {
    this.#store.setCollapsed('cornersSquareOptions', value);
  }
}
