import { Routes } from '@angular/router';

export default [
  {
    path: 'text-interpolation-lesson',
    loadComponent: () =>
      import('./text-interpolation-lesson/text-interpolation-lesson').then(
        (m) => m.TextInterpolationLesson,
      ),
  },
] satisfies Routes;
