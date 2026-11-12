import { Routes } from '@angular/router';

export const LESSONS_ROUTES: Routes = [
  {
    path: 'text-interpolation-lesson',
    loadComponent: () =>
      import('./text-interpolation-lesson/text-interpolation-lesson').then(
        (m) => m.TextInterpolationLesson,
      ),
  },
  {
    path: 'attribute-binding-lesson',
    loadComponent: () =>
      import('./attributes-binding-lesson/attributes-binding-lesson').then(
        (m) => m.AttributesBindingLesson,
      ),
  },
  {
    path: 'two-way-binding-lesson',
    loadComponent: () =>
      import('./two-way-binding-lesson/two-way-binding-lesson').then((m) => m.TwoWayBindingLesson),
  },
  {
    path: 'conditional-rendering-lesson',
    loadComponent: () =>
      import('./conditional-rendering-lesson/conditional-rendering-lesson').then(
        (m) => m.ConditionalRenderingLesson,
      ),
  },
  {
    path: 'list-rendering-lesson',
    loadComponent: () =>
      import('./list-rendering-lesson/list-rendering-lesson').then((m) => m.ListRenderingLesson),
  },
];
