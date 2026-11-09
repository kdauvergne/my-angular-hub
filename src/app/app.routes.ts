import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
  //? Route en Lazy loading pour la page Home (module)
  //? La route sera chargée uniquement lorsque l'utilisateur naviguera vers cette route
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'lessons',
    loadChildren: () => import('./pages/lessons/lessons.routes'),
  },
  {
    path: 'exercices',
    loadChildren: () => import('./pages/exercices/exercices.routes'),
  },
];
