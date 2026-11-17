import { Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ShikiPipe } from '../../../pipes/shiki.pipe';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-services-injection-lesson',
  imports: [AsyncPipe, ShikiPipe],
  styleUrl: './services-injection-lesson.css',
  templateUrl: './services-injection-lesson.html',
})
export class ServicesInjectionLesson {
  // Injection moderne du service via la fonction inject()
  readonly notifService = inject(NotificationService);

  // État local du formulaire de démonstration
  newMessage = signal<string>('');
  selectedType = signal<'info' | 'success' | 'warning'>('info');

  // --- Snippets de code formatés via ShikiPipe ---

  serviceCreationCode: string = `// src/app/services/notification.service.ts
import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root', // Disponible partout sans import (ou @Service() en Angular 22+)
})
export class NotificationService {
  // État privé protégé contre les modifications externes
  private _items = signal<string[]>(['Bienvenue sur Angular 22']);

  // Exposition publique en lecture seule
  readonly items = this._items.asReadonly();
  readonly count = computed(() => this._items().length);

  add(label: string): void {
    this._items.update((list) => [...list, label]);
  }
}`;

  constructorInjectionCode: string = `// 👴 APPROCHE HISTORIQUE : Injection par le constructeur
import { Component } from '@angular/core';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-header',
  template: \`<span>Notifications : {{ notifService.count() }}</span>\`
})
export class HeaderComponent {
  // Angular résout et injecte l'instance via les paramètres du constructor
  constructor(public notifService: NotificationService) {}
}`;

  modernInjectCode: string = `// 🚀 APPROCHE MODERNE : Fonction inject() (Standard Angular)
import { Component, inject } from '@angular/core';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-header',
  template: \`<span>Notifications : {{ notifService.count() }}</span>\`
})
export class HeaderComponent {
  // Plus concis, typage inféré automatiquement, utilisable sans constructor
  readonly notifService = inject(NotificationService);

  envoyerAlerte(): void {
    this.notifService.add('Action utilisateur enregistrée');
  }
}`;

  hierarchicalScopeCode: string = `// 1. SINGLETON GLOBAL (95% des cas)
// Une seule instance partagée dans toute l'application
@Injectable({ providedIn: 'root' }) // ou @Service()
export class AuthService {}

// 2. INSTANCE LOCALE AU COMPOSANT (Cas spécifiques)
// Une nouvelle instance est créée pour chaque composant (et détruite avec lui)
@Component({
  selector: 'app-formulaire-complexe',
  providers: [FormWizardService], // Portée limitée à ce composant et ses enfants
  template: \`...\`
})
export class FormWizardComponent {
  private wizard = inject(FormWizardService);
}`;

  factoryPatternCode: string = `// 1. APPROCHE MODERNE (Angular 22+) : Option factory dans @Service()
import { Service } from '@angular/core';
import { environment } from '../../../environments/environment';

export abstract class LoggerService {
  abstract log(message: string): void;
}

class DevLogger implements LoggerService {
  log(msg: string) { console.log('[DEV]', msg); }
}

class ProdLogger implements LoggerService {
  log(msg: string) { /* Envoi vers un serveur de monitoring */ }
}

@Service({
  // Angular exécute cette fonction au moment de la première injection
  factory: () => (environment.production ? new ProdLogger() : new DevLogger()),
})
export class AppLogger extends LoggerService {
  override log(msg: string) {}
}

// 2. APPROCHE CLASSIQUE (Providers) : useFactory dans app.config.ts ou @Component
export const loggerProvider = {
  provide: LoggerService,
  useFactory: () => (environment.production ? new ProdLogger() : new DevLogger()),
};`;

  // --- Actions de la démonstration interactive ---

  updateMessage(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.newMessage.set(input.value);
  }

  updateType(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedType.set(select.value as 'info' | 'success' | 'warning');
  }

  sendNotification(event: Event): void {
    event.preventDefault();
    if (!this.newMessage().trim()) return;

    this.notifService.addNotification(this.newMessage(), this.selectedType());
    this.newMessage.set('');
  }
}
