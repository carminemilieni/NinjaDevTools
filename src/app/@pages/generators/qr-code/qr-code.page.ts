import { ChangeDetectionStrategy, Component } from '@angular/core';
import { QrCodeStore } from './qr-code.store';
import { ConfigFormComponent } from './components';
import { RenderWindowComponent } from './components/render-window.component';

/**
 * @description
 * A page component that renders a QR code.
 */
@Component({
  selector: 'app-qr-code',
  imports: [ConfigFormComponent, RenderWindowComponent],
  templateUrl: './qr-code.page.html',
  providers: [QrCodeStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QrCodePage {}
