import { Component, computed, signal } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { ShikiPipe } from '../../../pipes/shiki.pipe';

type EnvTarget = 'development' | 'staging' | 'production';

@Component({
  selector: 'app-environments-lesson',
  imports: [AsyncPipe, JsonPipe, ShikiPipe],
  styleUrl: './environments-lesson.css',
  templateUrl: './environments-lesson.html',
})
export class EnvironmentsLesson {
  // --- État du simulateur de build Angular ---
  selectedEnv = signal<EnvTarget>('development');

  // Configuration résolue automatiquement par Angular CLI selon la cible
  resolvedConfig = computed(() => {
    switch (this.selectedEnv()) {
      case 'development':
        return {
          cliCommand: 'ng serve (ou ng build --configuration=development)',
          replacedWith: 'src/environments/environment.development.ts',
          values: {
            production: false,
            apiUrl: 'http://localhost:3000/api',
            enableDebugLogs: true,
            firebaseProject: 'adrar-app-dev',
          },
        };
      case 'staging':
        return {
          cliCommand: 'ng build --configuration=staging',
          replacedWith: 'src/environments/environment.staging.ts',
          values: {
            production: false,
            apiUrl: 'https://staging-api.adrar-numerique.fr/api',
            enableDebugLogs: true,
            firebaseProject: 'adrar-app-staging',
          },
        };
      case 'production':
        return {
          cliCommand: 'ng build (configuration par défaut)',
          replacedWith: 'src/environments/environment.ts (fichier original)',
          values: {
            production: true,
            apiUrl: 'https://api.adrar-numerique.fr/api',
            enableDebugLogs: false,
            firebaseProject: 'adrar-app-prod',
          },
        };
    }
  });

  // --- Snippets de code formatés via ShikiPipe ---

  generateAndStructureCode: string = `# 1. Générer le dossier environments/ avec la CLI Angular
ng generate environments

# 2. Arborescence créée automatiquement dans src/ :
src/
├── app/
├── environments/
│   ├── environment.development.ts   # Utilisé avec ng serve (mode dev)
│   └── environment.ts               # Fichier de référence (mode production)
├── index.html
├── main.ts
└── styles.css`;

  envFilesContentCode: string = `// 📄 src/environments/environment.ts (Production par défaut)
export const environment = {
  production: true,
  apiUrl: 'https://api.adrar-numerique.fr/api',
  enableDebugLogs: false,
};

// 📄 src/environments/environment.development.ts (Développement local)
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  enableDebugLogs: true,
};`;

  angularJsonCode: string = `// angular.json (extrait de la section build -> configurations)
"configurations": {
  "production": {
    "budgets": [ ... ],
    "outputHashing": "all"
  },
  "development": {
    "optimization": false,
    "extractLicenses": false,
    "sourceMap": true,
    // ✨ Remplacement automatique au moment de la compilation :
    "fileReplacements": [
      {
        "replace": "src/environments/environment.ts",
        "with": "src/environments/environment.development.ts"
      }
    ]
  }
}`;

  usageInServiceCode: string = `// src/app/services/api.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// ✅ TOUJOURS importer 'environment' (jamais 'environment.development' !)
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  // L'URL bascule automatiquement entre localhost et le serveur de prod
  private readonly baseUrl = environment.apiUrl;

  getCourses() {
    if (environment.enableDebugLogs) {
      console.log('[DEV] Appel API vers :', this.baseUrl);
    }
    return this.http.get(\`\${this.baseUrl}/courses\`);
  }
}`;

  dotEnvHandlingCode: string = `// Option 1 : Angular SSR (src/server.ts) — Accès natif à process.env côté Node.js
const dbPassword = process.env['DB_PASSWORD']; // Reste 100% côté serveur !

// Option 2 : Utiliser un fichier .env côté Front-End avec @ngx-env/builder
// 1. Installation : ng add @ngx-env/builder
// 2. Fichier .env à la racine (préfixe NG_APP_ obligatoire pour la sécurité) :
//    NG_APP_API_URL=http://localhost:3000/api
//    NG_APP_VERSION=1.0.0

// 3. Lecture typée dans environment.ts :
export const environment = {
  production: import.meta.env.PROD,
  apiUrl: import.meta.env.NG_APP_API_URL,
};`;

  // --- Actions du simulateur ---

  selectEnv(target: EnvTarget): void {
    this.selectedEnv.set(target);
  }
}
