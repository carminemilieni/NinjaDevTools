import { signalStore, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { withLogger, withTreeShakableDevTools } from '@shared/features';
import { environment } from '@env';
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { updateState } from '@angular-architects/ngrx-toolkit';

const { languageOptions } = environment;

interface IAppState {
  language: {
    currentLanguage: string | null;
  };
}

const initialState: IAppState = {
  language: {
    currentLanguage: null,
  },
};

/**
 * LanguageStore
 *
 * @description
 * The LanguageStore is a signal store that manages
 * the commons application state.
 *
 */
export const LanguageStore = signalStore(
  { providedIn: 'root' },
  withTreeShakableDevTools('LanguageStore'),
  withLogger('LanguageStore'),
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
