import { Routes } from '@angular/router';

export const LESSONS_ROUTES: Routes = [
  {
    path: 'text-interpolation-lesson',
    loadComponent: () =>
      import('./text-interpolation-lesson/text-interpolation-lesson').then(
        (m) => m.TextInterpolationLesson,
      ),
  },
];
