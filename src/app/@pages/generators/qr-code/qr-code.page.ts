import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { NgxQrcodeStylingModule } from 'ngx-qrcode-styling';
import { QrCodeStore } from './qr-code.store';
import { CommonModule } from '@angular/common';
import { ConfigFormComponent } from './components/config-form.component';

/**
 * @description
 * A page component that renders a QR code.
 */
@Component({
  selector: 'app-qr-code',
  imports: [NgxQrcodeStylingModule, CommonModule, ConfigFormComponent],
  templateUrl: './qr-code.page.html',
  providers: [QrCodeStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QrCodePage {
  readonly #store = inject(QrCodeStore);

  protected readonly config = this.#store.renderConfig;

  /**
   * @description
   * A signal that indicates whether the view has been rendered.
   * @protected
   */
  protected readonly viewRendered = signal(true);

  /**
   * @description
   * A effect that triggers when the configuration changes.
   *
   * @sideEffects
   * - Updates the configuration.
   * - Sets the view to render.
   * - Sets a timeout to set the view to render.
   */
  protected readonly configChangeEffect = effect(() => {
    this.#store.config();
    this.viewRendered.set(false);
    setTimeout(() => {
      this.viewRendered.set(true);
    }, 0);
  });
}
