import { PartialStateUpdater, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { updateState } from '@angular-architects/ngrx-toolkit';
import { withLogger } from '@shared/features';
import { TQrConfigFormValues } from '@pages/generators/qr-code/qr-code.type';
import { computed } from '@angular/core';

interface IQRCodeState {
  config: TQrConfigFormValues;
}

const initialState: IQRCodeState = {
  config: {
    width: 500,
    height: 500,
    data: 'https://www.facebook.com/',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg',
    margin: 5,
    dotsOptions: {
      type: 'square',
      color: '#000000',
      gradient: {
        type: 'linear',
        rotation: 0,
        colorStops: [
          {
            offset: 0,
            color: '#000000',
          },
        ],
      },
    },
  },
};

const storeKey = 'qrCode';

/**
 * @description
 * A store that manages the state of the QR code generator.
 */
export const QrCodeStore = signalStore(
  withState(initialState),
  withLogger(storeKey),
  withMethods((store) => ({
    patchValues: (values: TQrConfigFormValues) => updateState(store, `${storeKey}`, updateConfig(values)),
  })),
  withComputed(({ config }) => ({
    renderConfig: computed(
      () =>
        ({
          ...config(),
          width: 300,
          height: 300,
        }) as Partial<TQrConfigFormValues>
    ),
  }))
);

function updateConfig(values: TQrConfigFormValues): PartialStateUpdater<IQRCodeState> {
  return () => ({
    config: {
      ...values,
    },
  });
}
