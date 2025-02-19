import { Component, effect, inject, signal } from '@angular/core';
import { QrCodeStore } from '../qr-code.store';
import { NgxQrcodeStylingModule } from 'ngx-qrcode-styling';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-render-window',
  imports: [NgxQrcodeStylingModule, CardModule],
  templateUrl: './render-window.component.html',
  styles: [
    `
      ::ng-deep ngx-qrcode-styling canvas {
        width: 100% !important;
      }
    `,
  ],
})
export class RenderWindowComponent {
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
