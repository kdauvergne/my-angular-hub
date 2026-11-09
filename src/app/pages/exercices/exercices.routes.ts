import { Routes } from '@angular/router';

export const EXERCICES_ROUTES: Routes = [
  {
    path: 'exercice-text-interpolation',
    loadComponent: () =>
      import('./exercice-text-interpolation/exercice-text-interpolation').then(
        (m) => m.ExerciceTextInterpolation,
      ),
  },
];
