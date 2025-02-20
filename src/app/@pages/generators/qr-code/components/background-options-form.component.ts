import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { ColorPickerModule } from 'primeng/colorpicker';
import { Panel } from 'primeng/panel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { GradientFormComponent } from './gradient-form.component';
import { IQrBackgroundOptionsFormControls } from '../qr-code.type';
import { QrCodeStore } from '../qr-code.store';

@Component({
  selector: 'app-background-options-form',
  imports: [Panel, ReactiveFormsModule, TranslatePipe, ColorPickerModule, SelectButtonModule, GradientFormComponent],
  templateUrl: './background-options-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackgroundOptionsFormComponent {
  readonly form = input<FormGroup<IQrBackgroundOptionsFormControls> | null>(null);
  protected readonly i18nPrefix = 'pages.qr-code.form.backgroundOptions';

  readonly #store = inject(QrCodeStore);
  protected readonly collapsed = this.#store.pageState.panelCollapsed.backgroundOptions;

  setCollapsed(value: boolean) {
    this.#store.setCollapsed('backgroundOptions', value);
  }
}
