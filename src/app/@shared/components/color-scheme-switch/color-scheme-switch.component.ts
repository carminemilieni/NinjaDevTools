import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeStore } from '@data/stores';
import { Button } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-color-scheme-switch',
  imports: [Button, Tooltip, TranslatePipe],
  templateUrl: './color-scheme-switch.component.html',
  styleUrl: './color-scheme-switch.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorSchemeSwitchComponent {
  protected readonly themeStore = inject(ThemeStore);
  protected readonly prefixI18n = 'components.color-scheme-switch';
}
