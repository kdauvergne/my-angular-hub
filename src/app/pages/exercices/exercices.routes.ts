import { Routes } from '@angular/router';

export const EXERCICES_ROUTES: Routes = [
  {
    path: 'exercice-text-interpolation',
    title: 'Text interpolation',
    loadComponent: () =>
      import('./exercice-text-interpolation/exercice-text-interpolation').then(
        (m) => m.ExerciceTextInterpolation,
      ),
  },
  {
    path: 'exercice-attribute-binding',
    title: 'Attribute binding',
    loadComponent: () =>
      import('./exercice-attribute-binding/exercice-attribute-binding').then(
        (m) => m.ExerciceAttributeBinding,
      ),
  },
  {
    path: 'exercice-event-binding',
    title: 'Event binding',
    loadComponent: () =>
      import('./exercice-event-binding/exercice-event-binding').then((m) => m.ExerciceEventBinding),
  },
  {
    path: 'exercice-conditional-rendering',
    title: 'Conditional rendering',
    loadComponent: () =>
      import('./exercice-conditional-rendering/exercice-conditional-rendering').then(
        (m) => m.ExerciceConditionalRendering,
      ),
  },
  {
    path: 'exercice-two-way-binding',
    title: 'Two way binding',
    loadComponent: () =>
      import('./exercice-two-way-binding/exercice-two-way-binding').then(
        (m) => m.ExerciceTwoWayBinding,
      ),
  },
  {
    path: 'exercice-list-rendering',
    title: 'List rendering',
    loadComponent: () =>
      import('./exercice-list-rendering/exercice-list-rendering').then(
        (m) => m.ExerciceListRendering,
      ),
  },
  {
    path: 'exercice-dynamic-styling',
    title: 'Dynamic styling',
    loadComponent: () =>
      import('./exercice-dynamic-styling/exercice-dynamic-styling').then(
        (m) => m.ExerciceDynamicStyling,
      ),
  },
  {
    path: 'exercice-signals',
    title: 'Signals',
    loadComponent: () =>
      import('./exercice-signals/exercice-signals').then((m) => m.ExerciceSignals),
  },
  {
    path: 'exercice-form-validation',
    title: 'Form validation',
    loadComponent: () =>
      import('./exercice-form-validation/exercice-form-validation').then(
        (m) => m.ExerciceFormValidation,
      ),
  },
];
