import { PartialStateUpdater, signalStore, withMethods, withState } from '@ngrx/signals';
import { updateState } from '@angular-architects/ngrx-toolkit';
import { withLogger } from '@shared/features';
import { TQrConfigFormValues } from '@pages/generators/qr-code/qr-code.type';

interface IQRCodeState {
  config: Partial<TQrConfigFormValues>;
}

const initialState: IQRCodeState = {
  config: {
    width: 500,
    height: 300,
    lockProportions: true,
    data: 'https://www.facebook.com/',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg',
    margin: 5,
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
    patchValues: (values: Partial<TQrConfigFormValues>) => updateState(store, `${storeKey}`, updateConfig(values)),
  }))
);

function updateConfig(values: Partial<TQrConfigFormValues>): PartialStateUpdater<IQRCodeState> {
  return () => ({
    config: {
      ...values,
    },
  });
}
