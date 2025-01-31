import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { EColorScheme, EMode, LanguageStore, ThemeStore } from '@data/stores';
import { RouterOutlet } from '@angular/router';
import { SideMenuLayout } from '@layouts/side-menu';
import { AppBarLayout } from '@layouts/app-bar';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main.layout.html',
  styleUrl: './main.layout.scss',
  imports: [ButtonModule, SideMenuLayout, AppBarLayout, RouterOutlet],
})
export class MainLayout {
  protected readonly languageStore = inject(LanguageStore);
  protected readonly themeStore = inject(ThemeStore);
  protected readonly ThemeMode = EMode;
  protected readonly ThemeColorScheme = EColorScheme;
  protected readonly EColorScheme = EColorScheme;
}
