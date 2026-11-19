import { Component, computed, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ShikiPipe } from '../../../pipes/shiki.pipe';

type SimulatedRoute = '/home' | '/users' | '/admin' | '/404';

@Component({
  selector: 'app-router-lesson',
  imports: [AsyncPipe, ShikiPipe],
  styleUrl: './router-lesson.css',
  templateUrl: './router-lesson.html',
})
export class RouterLesson {
  // --- État du simulateur de navigation ---
  activeRoute = signal<SimulatedRoute>('/home');
  selectedUserId = signal<number>(42);
  isAuthenticated = signal<boolean>(false);
  guardMessage = signal<string | null>(null);

  // URL complète calculée dynamiquement
  simulatedUrl = computed(() => {
    if (this.activeRoute() === '/users') {
      return `/users/${this.selectedUserId()}`;
    }
    return this.activeRoute();
  });

  // --- Snippets de code formatés via ShikiPipe ---

  routesConfigCode: string = `// 1. src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  // Lazy Loading (chargement à la demande pour alléger le bundle initial)
  {
    path: 'users/:id',
    loadComponent: () => import('./pages/user-detail/user-detail').then(m => m.UserDetail),
  },
  // Route protégée par un Guard fonctionnel
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/admin/admin').then(m => m.Admin),
  },
  // Wildcard : intercepte toutes les URL inconnues (toujours en DERNIER)
  { path: '**', loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound) },
];

// 2. src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    // Active le Router + lie automatiquement les paramètres d'URL aux input()
    provideRouter(routes, withComponentInputBinding()),
  ],
};`;

  templateNavCode: string = `<!-- src/app/app.html -->
<nav class="navbar bg-base-200 gap-2">
  <!-- routerLink évite le rechargement complet de la page (SPA) -->
  <a
    routerLink="/home"
    routerLinkActive="btn-primary"
    [routerLinkActiveOptions]="{ exact: true }"
    class="btn btn-sm">
    Accueil
  </a>

  <!-- Passage de segments dynamiques sous forme de tableau -->
  <a
    [routerLink]="['/users', 42]"
    routerLinkActive="btn-primary"
    class="btn btn-sm">
    Profil #42
  </a>

  <a routerLink="/admin" routerLinkActive="btn-primary" class="btn btn-sm">
    Administration
  </a>
</nav>

<!-- Zone d'affichage dynamique du composant correspondant à l'URL -->
<main class="p-6">
  <router-outlet />
</main>`;

  programmaticNavCode: string = `// Navigation depuis le TypeScript (après un login, un formulaire, etc.)
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({ ... })
export class LoginComponent {
  private router = inject(Router);

  onLoginSuccess(userId: number): void {
    // Redirection vers /users/42?tab=profile
    this.router.navigate(['/users', userId], {
      queryParams: { tab: 'profile' },
    });
  }
}`;

  classicParamsCode: string = `// 👴 APPROCHE HISTORIQUE : ActivatedRoute
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({ ... })
export class UserDetailClassicComponent implements OnInit {
  private route = inject(ActivatedRoute);
  userId: string | null = null;

  ngOnInit(): void {
    // Lecture ponctuelle (snapshot) ou réactive (paramMap.subscribe)
    this.userId = this.route.snapshot.paramMap.get('id');
  }
}`;

  modernParamsCode: string = `// 🚀 APPROCHE MODERNE : Component Input Binding (Signal Input)
import { Component, input } from '@angular/core';

@Component({
  template: \`<h2>Profil de l'utilisateur n° {{ id() }}</h2>\`
})
export class UserDetailModernComponent {
  // Grâce à withComponentInputBinding(), le paramètre ':id' de la route
  // est automatiquement injecté dans ce Signal Input !
  id = input.required<string>();
}`;

  functionalGuardCode: string = `// src/app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // Autorise l'accès à la route
  }

  // Bloque l'accès et redirige proprement vers /login via un UrlTree
  return router.createUrlTree(['/login']);
};`;

  // --- Actions du simulateur ---

  navigate(route: SimulatedRoute, userId?: number): void {
    if (route === '/admin' && !this.isAuthenticated()) {
      this.guardMessage.set(
        '⛔ Navigation interceptée par authGuard : utilisateur non connecté. Redirection vers /home.',
      );
      this.activeRoute.set('/home');
      return;
    }

    this.guardMessage.set(null);
    if (userId !== undefined) {
      this.selectedUserId.set(userId);
    }
    this.activeRoute.set(route);
  }

  toggleAuth(): void {
    this.isAuthenticated.update((state) => !state);
    if (!this.isAuthenticated() && this.activeRoute() === '/admin') {
      this.activeRoute.set('/home');
      this.guardMessage.set('🔒 Déconnexion détectée : sortie de la zone /admin.');
    } else {
      this.guardMessage.set(null);
    }
  }
}
