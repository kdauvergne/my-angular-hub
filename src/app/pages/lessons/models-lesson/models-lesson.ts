import { Component, computed, signal } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { ShikiPipe } from '../../../pipes/shiki.pipe';

// Exemple d'interface (contrat de structure uniquement, disparaît à la compilation)
export interface UserInterface {
  readonly id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'student' | 'guest';
  isActive: boolean;
}

// Exemple de classe (existe au runtime, possède un constructeur et des méthodes)
export class UserClass implements UserInterface {
  readonly id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'student' | 'guest';
  isActive: boolean;

  constructor(data: Partial<UserInterface> = {}) {
    this.id = data.id ?? Date.now();
    this.firstName = data.firstName ?? 'Invité';
    this.lastName = data.lastName ?? 'Anonyme';
    this.email = data.email ?? 'contact@adrar-numerique.fr';
    this.role = data.role ?? 'student';
    this.isActive = data.isActive ?? true;
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName.toUpperCase()}`;
  }

  isAdmin(): boolean {
    return this.role === 'admin';
  }
}

@Component({
  selector: 'app-models-lesson',
  imports: [AsyncPipe, JsonPipe, ShikiPipe],
  styleUrl: './models-lesson.css',
  templateUrl: './models-lesson.html',
})
export class ModelsLesson {
  // --- État du simulateur interactif ---
  selectedMode = signal<'interface' | 'class' | 'omit'>('interface');
  firstNameInput = signal<string>('Camille');
  lastNameInput = signal<string>('Laurent');
  roleInput = signal<'admin' | 'student' | 'guest'>('student');

  // Représentation en temps réel selon le modèle choisi
  simulatedPayload = computed(() => {
    if (this.selectedMode() === 'interface') {
      const obj: UserInterface = {
        id: 101,
        firstName: this.firstNameInput(),
        lastName: this.lastNameInput(),
        email: `${this.firstNameInput().toLowerCase()}@adrar.fr`,
        role: this.roleInput(),
        isActive: true,
      };
      return obj;
    }

    if (this.selectedMode() === 'class') {
      return new UserClass({
        id: 101,
        firstName: this.firstNameInput(),
        lastName: this.lastNameInput(),
        email: `${this.firstNameInput().toLowerCase()}@adrar.fr`,
        role: this.roleInput(),
      });
    }

    // Mode 'omit' : DTO de création sans 'id' (généré par le backend)
    const createDto: Omit<UserInterface, 'id'> = {
      firstName: this.firstNameInput(),
      lastName: this.lastNameInput(),
      email: `${this.firstNameInput().toLowerCase()}@adrar.fr`,
      role: this.roleInput(),
      isActive: true,
    };
    return createDto;
  });

  // Appel d'une méthode métier (uniquement disponible sur la Class !)
  computedMethodPreview = computed(() => {
    const current = this.simulatedPayload();
    if (current instanceof UserClass) {
      return `user.getFullName() ➔ "${current.getFullName()}" | user.isAdmin() ➔ ${current.isAdmin()}`;
    }
    return '⚠️ Méthodes indisponibles : un objet brut typé par interface ne contient que des données JSON.';
  });

  // --- Snippets de code formatés via ShikiPipe ---

  folderStructureCode: string = `src/
└── app/
    ├── models/                  # 📁 Dossier centralisé des modèles de données
    │   ├── user.model.ts        # Interfaces & types liés aux utilisateurs
    │   ├── product.model.ts     # Interfaces & classes liés au catalogue
    │   └── index.ts             # Barrel file (réexporte tous les modèles)
    ├── services/
    │   └── user.service.ts      # Importe User depuis '../models'
    └── components/
        └── user-card/
            └── user-card.ts     # Importe User depuis '../../models'`;

  interfaceCode: string = `// src/app/models/user.model.ts

// Type Union : restreint les valeurs autorisées (autocomplétion garantie)
export type UserRole = 'admin' | 'student' | 'guest';

// Interface : contrat de forme (100% effacé lors de la compilation en JS)
export interface User {
  readonly id: number;        // Empêche la modification accidentelle de l'ID
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  avatarUrl?: string;         // Propriété optionnelle (?)
}

// Types Utilitaires TypeScript (évite de dupliquer les interfaces !)
export type CreateUserDto = Omit<User, 'id'>;    // Tout sauf 'id' (pour un POST)
export type UpdateUserDto = Partial<User>;       // Toutes les propriétés optionnelles (pour un PATCH)`;

  classCode: string = `// src/app/models/product.model.ts
export class Product {
  readonly id: number;
  name: string;
  priceHT: number;
  vatRate: number;

  // Constructeur avec valeurs par défaut sécurisées
  constructor(data: Partial<Product> = {}) {
    this.id = data.id ?? Date.now();
    this.name = data.name ?? 'Nouveau produit';
    this.priceHT = data.priceHT ?? 0;
    this.vatRate = data.vatRate ?? 0.2; // TVA 20% par défaut
  }

  // Méthode métier réutilisable partout dans l'application
  getPriceTTC(): number {
    return Number((this.priceHT * (1 + this.vatRate)).toFixed(2));
  }

  isExpensive(): boolean {
    return this.getPriceTTC() > 100;
  }
}`;

  usageInAngularCode: string = `// 1. Dans un Service (src/app/services/user.service.ts)
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, CreateUserDto } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);

  // Le retour est fortement typé : User[]
  getUsers() {
    return this.http.get<User[]>('/api/users');
  }

  createUser(payload: CreateUserDto) {
    return this.http.post<User>('/api/users', payload);
  }
}

// 2. Dans un Composant (src/app/components/user-card/user-card.ts)
import { Component, input, signal } from '@angular/core';
import { User } from '../../models/user.model';

@Component({ ... })
export class UserCardComponent {
  user = input.required<User>();     // Signal Input typé
  usersList = signal<User[]>([]);    // Signal d'état typé
}`;

  // --- Actions du simulateur ---

  setMode(mode: 'interface' | 'class' | 'omit'): void {
    this.selectedMode.set(mode);
  }

  updateFirstName(event: Event): void {
    this.firstNameInput.set((event.target as HTMLInputElement).value);
  }

  updateLastName(event: Event): void {
    this.lastNameInput.set((event.target as HTMLInputElement).value);
  }

  updateRole(event: Event): void {
    this.roleInput.set((event.target as HTMLSelectElement).value as 'admin' | 'student' | 'guest');
  }
}
