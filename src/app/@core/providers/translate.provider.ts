import { EnvironmentProviders } from '@angular/core';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { environment } from '@env';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

const { defaultLanguage } = environment.languageOptions;

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './i18n/', '.json');

export const TRANSLATE_PROVIDER: EnvironmentProviders = provideTranslateService({
  defaultLanguage,
  loader: {
    provide: TranslateLoader,
    useFactory: httpLoaderFactory,
    deps: [HttpClient],
  },
});
