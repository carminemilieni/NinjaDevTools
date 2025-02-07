import { Component, inject, Signal } from '@angular/core';
import { Card } from 'primeng/card';
import { ReactiveFormsModule } from '@angular/forms';
import QrConfigForm from '@pages/generators/qr-code/forms/qr-config.form';
import { InputNumber } from 'primeng/inputnumber';
import { FloatLabel } from 'primeng/floatlabel';
import { tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ToggleButton } from 'primeng/togglebutton';
import { QrCodeStore } from '@pages/generators/qr-code/qr-code.store';
import { TQrConfigFormGroup } from '@pages/generators/qr-code/qr-code.type';
import { TranslatePipe } from '@ngx-translate/core';
import { InputText } from 'primeng/inputtext';

/**
 * @description
 * ConfigFormComponent is a component that renders a form for configuring a QR code.
 */
@Component({
  selector: 'app-config-form',
  imports: [Card, ReactiveFormsModule, InputNumber, FloatLabel, ToggleButton, TranslatePipe, InputText],
  templateUrl: './config-form.component.html',
})
export class ConfigFormComponent {
  protected readonly i18nPrefix = 'pages.qr-code.form';
  readonly #store = inject(QrCodeStore);
  readonly formGroup: TQrConfigFormGroup;
  readonly #updateStateEffect: Signal<any>;
  readonly #handlers: Signal<any>[] = [];

  constructor() {
    const { form, handlers$ } = QrConfigForm(this.#store.config());
    this.formGroup = form;
    this.#handlers.push(...handlers$.map((h) => toSignal<any>(h)));
    this.#updateStateEffect = toSignal(
      this.formGroup.valueChanges.pipe(tap((values) => this.#store.patchValues(values)))
    );
  }
}
