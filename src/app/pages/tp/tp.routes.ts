import { Routes } from '@angular/router';

export const TP_ROUTES: Routes = [
  {
    path: 'tp-component-communication',
    title: 'Component communication',
    loadComponent: () =>
      import('./tp-component-communication/tp-component-communication').then(
        (m) => m.TpComponentCommunication,
      ),
  },
];
