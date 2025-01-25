import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import { LoggerModule } from 'ngx-logger';
import { environment } from '@env';

const { level, enableSourceMaps } = environment.logger;

export const LOGGER_PROVIDER: EnvironmentProviders = importProvidersFrom(
  LoggerModule.forRoot({
    level,
    enableSourceMaps,
  })
);
