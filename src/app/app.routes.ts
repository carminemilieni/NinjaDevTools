import { TRoutesExtended } from '@shared/types';

export const PRIMARY_NAVIGATION: TRoutesExtended = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: '',
    loadComponent: () => import('./@layouts/main/main.layout').then((l) => l.MainLayout),
    children: [
      {
        title: 'Menu',
        path: '',
        data: {
          sideMenu: {
            isItem: true,
          },
        },
        children: [
          {
            path: 'home',
            title: 'Home',
            data: {
              sideMenu: {
                isItem: true,
                icon: 'pi pi-home',
              },
            },
            loadComponent: () => import('./@pages/home/home.page').then((p) => p.HomePage),
          },
        ],
      },
      {
        path: 'generators',
        data: {
          sideMenu: {
            isItem: true,
            icon: 'pi pi-cog',
            label: 'Generators',
          },
        },
        children: [
          {
            path: 'qr-code',
            title: 'QR Code',
            data: {
              sideMenu: {
                isItem: true,
                icon: 'pi pi-qrcode',
              },
            },
            loadComponent: () => import('./@pages/generators/qr-code/qr-code.page').then((p) => p.QrCodePage),
          },
        ],
      },
    ],
  },
];

export const routes: TRoutesExtended = [...PRIMARY_NAVIGATION];
