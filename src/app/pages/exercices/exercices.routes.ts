import { Routes } from '@angular/router';

export const EXERCICES_ROUTES: Routes = [
  {
    path: 'exercice-text-interpolation',
    loadComponent: () =>
      import('./exercice-text-interpolation/exercice-text-interpolation').then(
        (m) => m.ExerciceTextInterpolation,
      ),
  },
  {
    path: 'exercice-attribute-binding',
    loadComponent: () =>
      import('./exercice-attribute-binding/exercice-attribute-binding').then(
        (m) => m.ExerciceAttributeBinding,
      ),
  },
  {
    path: 'exercice-event-binding',
    loadComponent: () =>
      import('./exercice-event-binding/exercice-event-binding').then((m) => m.ExerciceEventBinding),
  },
  {
    path: 'exercice-conditional-rendering',
    loadComponent: () =>
      import('./exercice-conditional-rendering/exercice-conditional-rendering').then(
        (m) => m.ExerciceConditionalRendering,
      ),
  },
  {
    path: 'exercice-two-way-binding',
    loadComponent: () =>
      import('./exercice-two-way-binding/exercice-two-way-binding').then(
        (m) => m.ExerciceTwoWayBinding,
      ),
  },
];
