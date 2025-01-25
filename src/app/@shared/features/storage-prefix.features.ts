import { signalStoreFeature } from '@ngrx/signals';
import { environment } from '@env';
import { SyncConfig, withStorageSync } from '@angular-architects/ngrx-toolkit';

/**
 * @description
 * A feature that provides a storage prefix to a storageSync feature.
 *
 * @param key The key to use for the storage.
 */
export function withStoragePrefix(key: string) {
  return signalStoreFeature(withStorageSync(`${environment.store.storagePrefix}_${key}`));
}

/**
 * @description
 * A feature that provides a storage prefix to a storageSync feature.
 *
 * @param config The storageSync configuration.
 */
export function withStoragePrefixAndConfig(config: SyncConfig<any>) {
  return signalStoreFeature(
    withStorageSync({
      ...config,
      key: `${environment.store.storagePrefix}_${config.key}`,
    })
  );
}
