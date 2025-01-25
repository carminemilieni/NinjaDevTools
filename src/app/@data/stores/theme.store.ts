import { signalStore, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { withLogger, withStoragePrefix, withTreeShakableDevTools } from '@shared/features';
import { updateState } from '@angular-architects/ngrx-toolkit';
import { effect, inject, Signal } from '@angular/core';
import { PrimeNG } from 'primeng/config';

export enum EColorScheme {
  Light = 'lightMode',
  Dark = 'darkMode',
}

export enum EMode {
  Auto = 'system',
  Manual = 'manual',
}

interface IThemeState {
  defaultColorScheme: EColorScheme;
  preferredColorScheme: EColorScheme;
  mode: EMode;
}

const initialState: IThemeState = {
  defaultColorScheme: EColorScheme.Dark,
  preferredColorScheme: EColorScheme.Dark,
  mode: EMode.Auto,
};

const storeKey = 'ThemeStore';

const darkModeCSSSelector = '.dark-mode';

/**
 * ThemeStore
 *
 * @description
 * A store that manages the theme of the application.
 *
 */
export const ThemeStore = signalStore(
  { providedIn: 'root' },
  withTreeShakableDevTools(storeKey),
  withLogger(storeKey),
  withStoragePrefix(storeKey),
  withState(initialState),
  withProps(() => ({
    primeNg: inject(PrimeNG),
  })),
  withMethods((store) => ({
    setPreferredColorScheme(preferredColorScheme: EColorScheme) {
      updateState(store, 'setPreferredColorScheme', {
        preferredColorScheme,
      });
    },
    setMode(mode: EMode) {
      updateState(store, 'setMode', {
        mode,
      });
    },
  })),

  withHooks(({ preferredColorScheme, mode, primeNg, debug }) => ({
    onInit() {
      onChangeModeEffect(mode, primeNg, debug);
      onChangePreferredColorSchemeEffect(preferredColorScheme, debug);
    },
  }))
);

const onChangePreferredColorSchemeEffect = (
  preferredColorScheme: Signal<EColorScheme>,
  debug: (message?: any, ...additional: any[]) => void
) =>
  effect(() => {
    const colorScheme = preferredColorScheme();
    const element = document.querySelector('html');
    if (element) {
      if (colorScheme === EColorScheme.Dark) {
        element.classList.add('dark-mode');
        element.classList.remove('light-mode');
      } else {
        element.classList.add('light-mode');
        element.classList.remove('dark-mode');
      }
    }
    debug('onChangePreferredColorSchemeEffect', {
      colorScheme,
    });
  });

const onChangeModeEffect = (
  modeS: Signal<EMode>,
  primeNg: PrimeNG,
  debug: (message?: any, ...additional: any[]) => void
) =>
  effect(() => {
    const mode = modeS();
    primeNg.theme.update((state) => ({
      ...state,
      options: {
        ...state.options,
        darkModeSelector: mode === EMode.Auto ? EMode.Auto : darkModeCSSSelector,
      },
    }));
    debug('onChangeModeEffect', {
      mode,
    });
  });
