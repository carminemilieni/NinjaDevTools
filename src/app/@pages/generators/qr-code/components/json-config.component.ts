import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { QrCodeStore } from '../qr-code.store';
import { TranslatePipe } from '@ngx-translate/core';
import { JsonViewerWrapperComponent } from '@app/@shared/components';
@Component({
  selector: 'app-json-config',
  imports: [PanelModule, TranslatePipe, JsonViewerWrapperComponent],
  templateUrl: './json-config.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonConfigComponent {
  readonly #store = inject(QrCodeStore);
  protected readonly i18nPrefix = 'pages.qr-code.form.jsonConfig';
  protected readonly collapsed = this.#store.pageState.panelCollapsed.jsonConfig;
  protected readonly json = this.#store.config;

  setCollapsed(value: boolean) {
    this.#store.setCollapsed('jsonConfig', value);
  }
}
