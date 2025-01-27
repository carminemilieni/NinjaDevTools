import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button } from 'primeng/button';
import { Toolbar } from 'primeng/toolbar';
import { ColorSchemeSwitchComponent, LanguageSwitchComponent } from '@shared/components';

@Component({
  selector: 'app-app-bar',
  imports: [Button, Toolbar, ColorSchemeSwitchComponent, LanguageSwitchComponent],
  templateUrl: './app-bar.layout.html',
  styleUrl: './app-bar.layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppBarLayout {}
