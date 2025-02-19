import { ValidationConstraints } from './../qr-config.form';
import { Component, computed, inject, Signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import QrConfigForm from '@pages/generators/qr-code/qr-config.form';
import { InputNumber } from 'primeng/inputnumber';
import { FloatLabel } from 'primeng/floatlabel';
import { tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { QrCodeStore } from '@pages/generators/qr-code/qr-code.store';
import { TQrConfigFormGroup, TQrConfigFormValues } from '@pages/generators/qr-code/qr-code.type';
import { TranslatePipe } from '@ngx-translate/core';
import { InputText } from 'primeng/inputtext';
import { FileUpload, FileUploadHandlerEvent } from 'primeng/fileupload';
import { NGXLogger } from 'ngx-logger';
import { Button } from 'primeng/button';
import { DotOptionsFormComponent } from './';
import { CommonModule } from '@angular/common';
import { CornersSquareOptionsFormComponent } from './corners-square-options-form.component';
import { CornersDotOptionsFormComponent } from './corners-dot-options-form.component';
import { BackgroundOptionsFormComponent } from './background-options-form.component';
import { PanelModule } from 'primeng/panel';

/**
 * @description
 * ConfigFormComponent is a component that renders a form for configuring a QR code.
 */
@Component({
  selector: 'app-config-form',
  imports: [
    ReactiveFormsModule,
    InputNumber,
    FloatLabel,
    TranslatePipe,
    InputText,
    FileUpload,
    Button,
    DotOptionsFormComponent,
    CommonModule,
    CornersSquareOptionsFormComponent,
    CornersDotOptionsFormComponent,
    BackgroundOptionsFormComponent,
    PanelModule,
  ],
  templateUrl: './config-form.component.html',
})
export class ConfigFormComponent {
  protected readonly i18nPrefix = 'pages.qr-code.form';
  protected readonly ValidationConstraints = ValidationConstraints;

  readonly #store = inject(QrCodeStore);
  protected readonly collapsed = this.#store.pageState.panelCollapsed.mainOptions;
  readonly formGroup: TQrConfigFormGroup;
  readonly #updateStateEffect: Signal<any>;
  readonly #handlers: Signal<any>[] = [];
  readonly #logger = inject(NGXLogger);

  readonly viewUpload = computed(() => !this.#store.config().image);
  readonly viewRemoveUpload = computed(() => !!this.#store.config().image);

  constructor() {
    const { form, handlers$ } = QrConfigForm(this.#store.config());
    this.formGroup = form;
    this.#handlers.push(...handlers$.map((h) => toSignal<any>(h)));
    this.#updateStateEffect = toSignal(
      this.formGroup.valueChanges.pipe(tap((values) => this.#store.patchValues(values as TQrConfigFormValues)))
    );
  }

  onBasicUploadAuto({ files }: FileUploadHandlerEvent) {
    if (files.length) {
      const file = files[0];
      this.formGroup.controls.image.setValue(URL.createObjectURL(file));
      this.#logger.trace('onBasicUploadAuto', file);
    }
  }

  onRemoveImage() {
    this.formGroup.controls.image.setValue(undefined);
  }

  setCollapsed(value: boolean) {
    this.#store.setCollapsed('mainOptions', value);
  }
}
