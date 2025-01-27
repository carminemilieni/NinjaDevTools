import { signalStore, withComputed, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { withLogger, withStoragePrefix, withTreeShakableDevTools } from '@shared/features';
import { environment } from '@env';
import { computed, effect, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { updateState } from '@angular-architects/ngrx-toolkit';

const { languageOptions } = environment;

interface ILanguageState {
  language: {
    currentLanguage: string | null;
  };
}

const initialState: ILanguageState = {
  language: {
    currentLanguage: null,
  },
};

const storeKey = 'LanguageStore';

/**
 * LanguageStore
 *
 * @description
 * A store that manages the language of the application.
 *
 */
export const LanguageStore = signalStore(
  { providedIn: 'root' },
  withTreeShakableDevTools(storeKey),
  withLogger(storeKey),
  withStoragePrefix(storeKey),
  withState(initialState),
  withProps(() => ({
    languageOptions,
    translateSrv: inject(TranslateService),
    availableOpts: languageOptions.available.map(
      (code) =>
        ({
          label: `stores.language.available.${code}.label`,
          value: code,
          flag: `stores.language.available.${code}.flag`,
        }) as ILanguageOpt
    ),
  })),
  withMethods((store) => ({
    setLanguage(lang: string) {
      updateState(store, 'setLanguage', {
        language: {
          currentLanguage: lang,
        },
      });
    },
  })),
  withComputed(({ language, availableOpts }) => ({
    currentOpt: computed(() => availableOpts.find((opt) => opt.value === language.currentLanguage())),
  })),
  withHooks(({ translateSrv, setLanguage, debug, language }) => ({
    onInit() {
      debug({
        currentLang: translateSrv.currentLang,
        defaultLang: translateSrv.defaultLang,
      });
      setLanguage(language.currentLanguage() || translateSrv.currentLang || translateSrv.defaultLang);

      effect(() => translateSrv.use(language.currentLanguage() ?? ''));
    },
  }))
);

export interface ILanguageOpt {
  label: string;
  value: string;
  flag: string;
}

export type TLanguageOpts = ILanguageOpt[];
