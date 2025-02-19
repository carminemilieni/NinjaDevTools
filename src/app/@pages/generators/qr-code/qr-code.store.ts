import { PartialStateUpdater, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { updateState } from '@angular-architects/ngrx-toolkit';
import { withLogger, withStoragePrefix, withTreeShakableDevTools } from '@shared/features';
import { IQrPageState, TQrConfigFormValues } from '@pages/generators/qr-code/qr-code.type';
import { computed } from '@angular/core';

interface IQRCodeState {
  config: TQrConfigFormValues;
  pageState: IQrPageState;
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
    cornersSquareOptions: {
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
    cornersDotOptions: {
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
    backgroundOptions: {
      round: 0,
      color: '#ffffff',
      gradient: {
        type: 'linear',
        rotation: 0,
        colorStops: [
          {
            offset: 0,
            color: '#ffffff',
          },
        ],
      },
    },
  },
  pageState: {
    panelCollapsed: {
      mainOptions: false,
      dotsOptions: true,
      cornersSquareOptions: true,
      cornersDotOptions: true,
      backgroundOptions: true,
    },
  },
};

const storeKey = 'QrCode';

/**
 * @description
 * A store that manages the state of the QR code generator.
 */
export const QrCodeStore = signalStore(
  withState(initialState),
  withLogger(storeKey),
  withTreeShakableDevTools(storeKey),
  withStoragePrefix(storeKey),
  withMethods((store) => ({
    patchValues: (values: TQrConfigFormValues) => updateState(store, `${storeKey} patchValues`, updateConfig(values)),
    setCollapsed: (key: keyof IQrPageState['panelCollapsed'], value: boolean) =>
      updateState(store, `${storeKey} setCollapsed`, updatePanelCollapsed(key, value)),
  })),
  withComputed(({ config }) => ({
    renderConfig: computed(
      () =>
        ({
          ...config(),
          width: 460,
          height: 460,
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

function updatePanelCollapsed(
  key: keyof IQrPageState['panelCollapsed'],
  value: boolean
): PartialStateUpdater<IQRCodeState> {
  return (state) => ({
    pageState: {
      ...state.pageState,
      panelCollapsed: {
        ...state.pageState.panelCollapsed,
        [key]: value,
      },
    },
  });
}
