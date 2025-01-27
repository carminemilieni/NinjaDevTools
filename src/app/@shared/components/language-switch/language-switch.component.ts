import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ILanguageOpt, LanguageStore } from '@data/stores';
import { Select } from 'primeng/select';
import { NgIf, NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { rxEffect } from 'ngxtension/rx-effect';
import { distinctUntilChanged, filter } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Language switch component.
 *
 * @description
 * This component is responsible for switching the language of the application.
 *
 * @example
 * ```html
 * <app-language-switch/>
 * ```
 */
@Component({
  selector: 'app-language-switch',
  imports: [Select, NgIf, ReactiveFormsModule, NgOptimizedImage, NgTemplateOutlet, TranslatePipe],
  templateUrl: './language-switch.component.html',
  styleUrl: './language-switch.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitchComponent {
  protected readonly languageStore = inject(LanguageStore);
  protected readonly ctrl = new FormControl<ILanguageOpt | null>(this.languageStore.currentOpt() ?? null, {
    nonNullable: true,
  });
  protected readonly i18nPrefix = 'components.language-switch';

  readonly #ctrlEffect = rxEffect(
    this.ctrl.valueChanges.pipe(
      distinctUntilChanged(),
      filter((v) => !!v)
    ),
    (lang) => this.languageStore.setLanguage(lang.value)
  );
}
