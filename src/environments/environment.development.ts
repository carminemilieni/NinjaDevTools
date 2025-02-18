import { NgxLoggerLevel } from 'ngx-logger';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

export const environment = {
  languageOptions: {
    defaultLanguage: 'en',
    available: ['en', 'it'],
    cache: true,
  },
  logger: {
    level: NgxLoggerLevel.TRACE,
    enableSourceMaps: true,
  },
  store: {
    storagePrefix: 'NinjaDevTools',
    withDevTools: withDevtools,
  },
  theme: {
    darkModeSelector: '.darkMode',
  },
};
