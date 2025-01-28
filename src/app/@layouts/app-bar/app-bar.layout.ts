import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { ColorSchemeSwitchComponent, LanguageSwitchComponent } from '@shared/components';

@Component({
  selector: 'app-app-bar',
  imports: [Toolbar, ColorSchemeSwitchComponent, LanguageSwitchComponent],
  templateUrl: './app-bar.layout.html',
  styleUrl: './app-bar.layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppBarLayout {}
