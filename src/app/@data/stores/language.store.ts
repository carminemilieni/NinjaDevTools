import { signalStore, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { withLogger, withStoragePrefix, withTreeShakableDevTools } from '@shared/features';
import { environment } from '@env';
import { inject } from '@angular/core';
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
  withHooks(({ translateSrv, setLanguage, trace }) => ({
    onInit() {
      trace({
        currentLang: translateSrv.currentLang,
        defaultLang: translateSrv.defaultLang,
      });
      setLanguage(translateSrv.currentLang || translateSrv.defaultLang);
    },
  }))
);
