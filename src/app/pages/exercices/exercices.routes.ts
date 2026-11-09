import { Routes } from '@angular/router';

export default [
  {
    path: 'exercice-text-interpolation',
    loadComponent: () =>
      import('./exercice-text-interpolation/exercice-text-interpolation').then(
        (m) => m.ExerciceTextInterpolation,
      ),
  },
] satisfies Routes;
