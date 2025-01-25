import { patchState, signalStore, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { withLogger } from '@shared/features';
import { environment } from '@env';
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

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
 * AppStore
 *
 * @description
 * The AppStore is a signal store that manages
 * the commons application state.
 *
 */
export const AppStore = signalStore(
  { providedIn: 'root' },
  withLogger('AppStore'),
  withState(initialState),
  withProps(() => ({
    languageOptions,
    translateSrv: inject(TranslateService),
  })),
  withMethods((store) => ({
    setLanguage(lang: string) {
      patchState(store, {
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
