import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { EColorScheme, EMode, LanguageStore, ThemeStore } from '@data/stores';
import { JsonPipe } from '@angular/common';
import { AppBarLayout, SideMenuLayout } from '@app/@layouts';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main.layout.html',
  styleUrl: './main.layout.scss',
  imports: [ButtonModule, JsonPipe, SideMenuLayout, AppBarLayout],
})
export class MainLayout {
  protected readonly languageStore = inject(LanguageStore);
  protected readonly themeStore = inject(ThemeStore);
  protected readonly ThemeMode = EMode;
  protected readonly ThemeColorScheme = EColorScheme;
  protected readonly EColorScheme = EColorScheme;
}
