import { Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ShikiPipe } from '../../../pipes/shiki.pipe';

export interface ApiUser {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

@Component({
  selector: 'app-http-client-lesson',
  imports: [AsyncPipe, ShikiPipe],
  styleUrl: './http-client-lesson.css',
  templateUrl: './http-client-lesson.html',
})
export class HttpClientLesson {
  private http = inject(HttpClient, { optional: true });

  // État réactif de la démonstration API
  users = signal<ApiUser[]>([]);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  lastRequestLog = signal<string>('En attente d’une requête HTTP...');

  // --- Extraits de code formatés via ShikiPipe ---

  configCode: string = `// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // Active HttpClient dans toute l'application (avec l'API Fetch moderne)
    provideHttpClient(withFetch()),
  ],
};`;

  serviceCode: string = `// src/app/services/user.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/users';

  // Typage générique <User[]> pour l'autocomplétion et la sécurité
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  createUser(newUser: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(this.apiUrl, newUser);
  }
}`;

  componentSubscribeCode: string = `// Consommation dans un composant avec Signals
import { Component, inject, signal, OnInit } from '@angular/core';
import { UserService, User } from './services/user.service';

@Component({ ... })
export class UsersListComponent implements OnInit {
  private userService = inject(UserService);

  users = signal<User[]>([]);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.isLoading.set(true);

    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Impossible de charger les utilisateurs.');
        this.isLoading.set(false);
      },
    });
  }
}`;

  modernInteropCode: string = `// Approche déclarative : convertir un Observable en Signal avec toSignal()
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserService } from './services/user.service';

@Component({
  template: \`
    @for (user of users(); track user.id) {
      <p>{{ user.name }} ({{ user.email }})</p>
    }
  \`
})
export class UsersDeclarativeComponent {
  private userService = inject(UserService);

  // Souscription automatique et exposition directe sous forme de Signal !
  users = toSignal(this.userService.getUsers(), { initialValue: [] });
}`;

  // --- Actions de la démonstration interactive ---

  fetchUsers(): void {
    if (!this.http) {
      this.errorMessage.set(
        'HttpClient non détecté : vérifiez que provideHttpClient() est bien ajouté dans app.config.ts.'
      );
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.lastRequestLog.set('GET https://jsonplaceholder.typicode.com/users?_limit=4');

    this.http
      .get<ApiUser[]>('https://jsonplaceholder.typicode.com/users?_limit=4')
      .subscribe({
        next: (data) => {
          this.users.set(data);
          this.isLoading.set(false);
          this.lastRequestLog.set(`✅ 200 OK — ${data.length} utilisateurs récupérés`);
        },
        error: () => {
          this.errorMessage.set('Erreur réseau lors de la récupération des utilisateurs.');
          this.isLoading.set(false);
          this.lastRequestLog.set('❌ Échec de la requête GET');
        },
      });
  }

  simulatePostUser(): void {
    if (!this.http) {
      this.errorMessage.set(
        'HttpClient non détecté : vérifiez que provideHttpClient() est bien ajouté dans app.config.ts.'
      );
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const payload = {
      name: `Étudiant ADRAR #${this.users().length + 1}`,
      email: `dev${this.users().length + 1}@adrar-numerique.fr`,
      company: { name: 'ADRAR Pôle Numérique' },
    };

    this.lastRequestLog.set('POST https://jsonplaceholder.typicode.com/users');

    this.http
      .post<ApiUser>('https://jsonplaceholder.typicode.com/users', payload)
      .subscribe({
        next: (createdUser) => {
          // JSONPlaceholder renvoie toujours id: 11, on garantit un id unique pour @for
          const userWithUniqueId: ApiUser = {
            ...createdUser,
            id: Date.now(),
          };
          this.users.update((list) => [userWithUniqueId, ...list]);
          this.isLoading.set(false);
          this.lastRequestLog.set(`✅ 201 Created — Ressource ajoutée (${userWithUniqueId.name})`);
        },
        error: () => {
          this.errorMessage.set('Erreur lors de l’envoi des données (POST).');
          this.isLoading.set(false);
          this.lastRequestLog.set('❌ Échec de la requête POST');
        },
      });
  }

  clearUsers(): void {
    this.users.set([]);
    this.errorMessage.set(null);
    this.lastRequestLog.set('Liste vidée.');
  }
}
