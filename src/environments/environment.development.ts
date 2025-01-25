import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  languageOptions: {
    defaultLanguage: 'en',
    available: ['en', 'it'],
  },
  logger: {
    level: NgxLoggerLevel.TRACE,
    enableSourceMaps: true,
  },
};
