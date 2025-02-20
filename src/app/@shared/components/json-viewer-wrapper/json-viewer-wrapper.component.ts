import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-json-viewer-wrapper',
  imports: [NgxJsonViewerModule, ButtonModule, TranslatePipe],
  templateUrl: './json-viewer-wrapper.component.html',
  styleUrl: './json-viewer-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonViewerWrapperComponent {
  protected readonly i18nPrefix = 'components.json-viewer-wrapper';
  protected readonly downloadLabel = this.i18nPrefix + '.download';
  readonly json = input<object>({});
  readonly expanded = input<boolean, string | boolean>(false, { transform: booleanAttribute });
  readonly isDownloadable = input<boolean, string | boolean>(true, { transform: booleanAttribute });
  readonly prefixFileName = input<string>('config-output');
  readonly suffixFileName = input<string>(`${new Date().toISOString().replace(/:/g, '-')}`);

  onDownload() {
    const blob = new Blob([JSON.stringify(this.json())], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.prefixFileName()}_${this.suffixFileName()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
}
