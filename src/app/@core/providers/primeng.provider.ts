import { EnvironmentProviders } from '@angular/core';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { environment } from '@env';

const { darkModeSelector } = environment.theme;

export const PRIMENG_PROVIDER: EnvironmentProviders = providePrimeNG({
  ripple: true,
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      cssLayer: false,
      darkModeSelector,
    },
  },
});
