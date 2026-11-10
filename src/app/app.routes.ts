import { Routes } from '@angular/router';

export const routes: Routes = [
  //? Redirection de la racine vers la page Home
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  //? Route en Lazy loading pour la page Home (module)
  //? La route sera chargée uniquement lorsque l'utilisateur naviguera vers cette route
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'lessons',
    loadChildren: () => import('./pages/lessons/lessons.routes').then((m) => m.LESSONS_ROUTES),
  },
  {
    path: 'exercices',
    loadChildren: () =>
      import('./pages/exercices/exercices.routes').then((m) => m.EXERCICES_ROUTES),
  },

  // ! Page not found

  {
    path: '**',
    loadComponent: () => import('./shared/not-found/not-found').then((m) => m.NotFound),
  },
];
