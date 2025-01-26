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
  Auto = 'auto',
  Manual = 'manual',
}

interface IThemeState {
  systemColorScheme: EColorScheme;
  preferredColorScheme: EColorScheme;
  mode: EMode;
}

const initialState: IThemeState = {
  systemColorScheme: EColorScheme.Dark,
  preferredColorScheme: EColorScheme.Dark,
  mode: EMode.Auto,
};

const storeKey = 'ThemeStore';

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
    setSystemColorScheme(systemColorScheme: EColorScheme) {
      updateState(store, 'setSystemColorScheme', {
        systemColorScheme,
      });
    },
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

  withHooks(({ preferredColorScheme, systemColorScheme, mode, setSystemColorScheme, trace }) => ({
    onInit() {
      listenToSystemColorSchemeChanges(setSystemColorScheme, trace);
      onChangeModeOrPreferredColorOrSystemColorEffect(mode, preferredColorScheme, systemColorScheme, trace);
    },
  }))
);

/**
 * onChangeModeOrPreferredColorOrSystemColorEffect
 *
 * @description
 * Listens to changes in the mode, preferred color scheme, and system color scheme of the application.
 * If the mode is set to auto, the color scheme is set to the system color scheme,
 * otherwise, the color scheme is set to the preferred color scheme.
 *
 * @param modeS The mode signal.
 * @param preferredColorSchemeS The preferred color scheme signal.
 * @param systemColorSchemeS The system color scheme signal.
 * @param log The logger function.
 */
const onChangeModeOrPreferredColorOrSystemColorEffect = (
  modeS: Signal<EMode>,
  preferredColorSchemeS: Signal<EColorScheme>,
  systemColorSchemeS: Signal<EColorScheme>,
  log: (message?: any, ...additional: any[]) => void
) =>
  effect(() => {
    const mode = modeS();
    const preferredColorScheme = preferredColorSchemeS();
    const systemColorScheme = systemColorSchemeS();

    const element = document.querySelector('html');
    if (!element) return;

    if (mode === EMode.Auto) {
      if (systemColorScheme === EColorScheme.Dark) {
        element.classList.add(EColorScheme.Dark);
        element.classList.remove(EColorScheme.Light);
      } else {
        element.classList.add(EColorScheme.Light);
        element.classList.remove(EColorScheme.Dark);
      }
    } else {
      if (preferredColorScheme === EColorScheme.Dark) {
        element.classList.add(EColorScheme.Dark);
        element.classList.remove(EColorScheme.Light);
      } else {
        element.classList.add(EColorScheme.Light);
        element.classList.remove(EColorScheme.Dark);
      }
    }

    log('onChangeModeEffect', {
      mode,
      preferredColorScheme,
      systemColorScheme,
    });
  });

/**
 * listenToSystemColorSchemeChanges
 *
 * @description
 * Listens to system color scheme changes and calls the callable function.
 *
 * @param callableFn The function to call when the system color scheme changes.
 * @param log The logger function.
 */
const listenToSystemColorSchemeChanges = (
  callableFn: (colorScheme: EColorScheme) => void,
  log: (message?: any, ...additional: any[]) => void
) => {
  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  darkModeMediaQuery.addEventListener('change', (event) => {
    const newColorScheme = event.matches ? EColorScheme.Dark : EColorScheme.Light;
    log('listenToSystemColorSchemeChanges', {
      newColorScheme,
      event,
      callableFn,
    });
    callableFn(newColorScheme);
  });

  const colorScheme = darkModeMediaQuery.matches ? EColorScheme.Dark : EColorScheme.Light;
  log('listenToSystemColorSchemeChanges', {
    colorScheme,
    callableFn,
  });
  callableFn(colorScheme);
};
