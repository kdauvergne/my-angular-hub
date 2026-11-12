import { Routes } from '@angular/router';

export const LESSONS_ROUTES: Routes = [
  {
    path: 'text-interpolation-lesson',
    title: 'Text interpolation',
    loadComponent: () =>
      import('./text-interpolation-lesson/text-interpolation-lesson').then(
        (m) => m.TextInterpolationLesson,
      ),
  },
  {
    path: 'attribute-binding-lesson',
    title: 'Attribute binding',
    loadComponent: () =>
      import('./attributes-binding-lesson/attributes-binding-lesson').then(
        (m) => m.AttributesBindingLesson,
      ),
  },
  {
    path: 'two-way-binding-lesson',
    title: 'Two way binding',
    loadComponent: () =>
      import('./two-way-binding-lesson/two-way-binding-lesson').then((m) => m.TwoWayBindingLesson),
  },
  {
    path: 'conditional-rendering-lesson',
    title: 'Conditional rendering',
    loadComponent: () =>
      import('./conditional-rendering-lesson/conditional-rendering-lesson').then(
        (m) => m.ConditionalRenderingLesson,
      ),
  },
  {
    path: 'list-rendering-lesson',
    title: 'List rendering',
    loadComponent: () =>
      import('./list-rendering-lesson/list-rendering-lesson').then((m) => m.ListRenderingLesson),
  },
  {
    path: 'signals-lesson',
    title: 'Signals',
    loadComponent: () => import('./signals-lesson/signals-lesson').then((m) => m.SignalsLesson),
  },
];
