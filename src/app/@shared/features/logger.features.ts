import { signalStoreFeature, withHooks, withMethods, withProps } from '@ngrx/signals';
import { inject } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

/**
 * @description
 * A feature that provides logging methods to a store.
 *
 * @example
 * ```ts
 * const store = createStore(
 *  withLogger('MyStore'),
 *  withInitialState({ count: 0 }),
 * );
 * ```
 *
 * @param name The name of the store.
 */
export function withLogger(name: string) {
  return signalStoreFeature(
    withProps(() => ({
      _logger: inject(NGXLogger),
      _logPrefix: `[${name}] `,
    })),
    withMethods(({ _logger, _logPrefix }) => ({
      log(message?: any | (() => any), ...additional: any[]) {
        _logger.log(_logPrefix, message, ...additional);
      },
      trace(message?: any | (() => any), ...additional: any[]) {
        _logger.trace(_logPrefix, message, ...additional);
      },
      debug(message?: any | (() => any), ...additional: any[]) {
        _logger.debug(_logPrefix, message, ...additional);
      },
      info(message?: any | (() => any), ...additional: any[]) {
        _logger.info(_logPrefix, message, ...additional);
      },
      warn(message?: any | (() => any), ...additional: any[]) {
        _logger.warn(_logPrefix, message, ...additional);
      },
      error(message?: any | (() => any), ...additional: any[]) {
        _logger.error(_logPrefix, message, ...additional);
      },
      fatal(message?: any | (() => any), ...additional: any[]) {
        _logger.fatal(_logPrefix, message, ...additional);
      },
    })),
    withHooks(({ info }) => ({
      onInit() {
        info('Initialized');
      },
      onDestroy() {
        info('Destroyed');
      },
    }))
  );
}
