import { environment as envDevelopment } from './environment.development';
import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  ...envDevelopment,
  production: true,
  logger: {
    ...envDevelopment.logger,
    level: NgxLoggerLevel.ERROR,
    sourceMaps: false,
  },
};
