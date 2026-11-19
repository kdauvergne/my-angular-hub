import { Component, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ShikiPipe } from '../../../pipes/shiki.pipe';

interface SimulatedDoc {
  id: string;
  title: string;
  author: string;
}

interface SimulatedRtdbNode {
  key: string;
  status: string;
  updatedAt: string;
}

@Component({
  selector: 'app-firebase-lesson',
  imports: [AsyncPipe, ShikiPipe],
  styleUrl: './firebase-lesson.css',
  templateUrl: './firebase-lesson.html',
})
export class FirebaseLesson {
  // --- État du simulateur BaaS interactif ---
  currentUser = signal<{ email: string; uid: string } | null>(null);
  newDocTitle = signal<string>('');
  firestoreDocs = signal<SimulatedDoc[]>([
    { id: 'doc_a1b2', title: 'Architecture Angular 22', author: 'prof@adrar.fr' },
    { id: 'doc_c3d4', title: 'Règles de sécurité Firebase', author: 'admin@adrar.fr' },
  ]);

  rtdbNodes = signal<SimulatedRtdbNode[]>([
    { key: '-Nx91aB', status: '🟢 En ligne', updatedAt: '10:15:02' },
    { key: '-Nx91cD', status: '🟡 Absent', updatedAt: '10:18:45' },
  ]);

  uploadProgress = signal<number>(0);
  isUploading = signal<boolean>(false);
  uploadedFileUrl = signal<string | null>(null);
  securityAlert = signal<string | null>(null);

  // --- Snippets de code formatés via ShikiPipe ---

  setupConfigCode: string = `// 1. Installation via Angular CLI :
// ng add @angular/fire

// 2. Configuration modulaire dans src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // Initialisation du cœur Firebase
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    // Activation à la carte des services BaaS nécessaires
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage()),
  ],
};`;

  authCode: string = `// src/app/services/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Auth,
  user,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);

  // Observable Firebase converti directement en Signal réactif !
  // Contient l'objet User si connecté, ou null sinon.
  readonly currentUser = toSignal(user(this.auth), { initialValue: null });

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }
}`;

  firestoreCode: string = `// src/app/services/courses.service.ts
import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  deleteDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Course {
  id?: string;
  title: string;
  author: string;
}

@Injectable({ providedIn: 'root' })
export class CoursesService {
  private firestore = inject(Firestore);
  // Référence vers la collection NoSQL "courses"
  private coursesRef = collection(this.firestore, 'courses');

  // Flux temps réel : chaque modification en base met à jour le Signal
  readonly courses = toSignal(
    collectionData(this.coursesRef, { idField: 'id' }) as Observable<Course[]>,
    { initialValue: [] }
  );

  addCourse(course: Omit<Course, 'id'>) {
    return addDoc(this.coursesRef, course);
  }

  deleteCourse(id: string) {
    const docRef = doc(this.firestore, \`courses/\${id}\`);
    return deleteDoc(docRef);
  }
}`;

  realtimeDbCode: string = `// src/app/services/presence.service.ts
import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Database, ref, listVal, push, set } from '@angular/fire/database';
import { Observable } from 'rxjs';

export interface PresenceNode {
  key?: string;
  status: string;
  updatedAt: string;
}

@Injectable({ providedIn: 'root' })
export class PresenceService {
  private db = inject(Database);
  // Chemin dans l'arbre JSON géant de Realtime Database
  private statusRef = ref(this.db, 'users_presence');

  // Écoute ultra-rapide des nœuds enfants
  readonly presenceList = toSignal(
    listVal<PresenceNode>(this.statusRef, { keyField: 'key' }) as Observable<PresenceNode[]>,
    { initialValue: [] }
  );

  pushStatus(status: string) {
    // Génère une clé chronologique unique (ex: -Nx91aB) et écrit la donnée
    const newNodeRef = push(this.statusRef);
    return set(newNodeRef, {
      status,
      updatedAt: new Date().toLocaleTimeString(),
    });
  }
}`;

  storageCode: string = `// src/app/services/storage.service.ts
import { Injectable, inject, signal } from '@angular/core';
import {
  Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  percentage,
} from '@angular/fire/storage';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private storage = inject(Storage);

  uploadProgress = signal<number>(0);
  downloadUrl = signal<string | null>(null);

  uploadAvatar(file: File, userId: string): void {
    // 1. Définir le chemin cible dans le bucket Cloud Storage
    const fileRef = ref(this.storage, \`avatars/\${userId}/\${file.name}\`);

    // 2. Démarrer l'envoi fractionné (resumable)
    const uploadTask = uploadBytesResumable(fileRef, file);

    // 3. Suivre la progression en pourcentage
    percentage(uploadTask).subscribe({
      next: ({ progress }) => this.uploadProgress.set(Math.round(progress)),
      error: (err) => console.error('Erreur upload :', err),
      complete: async () => {
        // 4. Récupérer l'URL publique sécurisée une fois terminé
        const url = await getDownloadURL(fileRef);
        this.downloadUrl.set(url);
      },
    });
  }
}`;

  // --- Actions du simulateur interactif ---

  toggleSimulateAuth(): void {
    this.securityAlert.set(null);
    if (this.currentUser()) {
      this.currentUser.set(null);
    } else {
      this.currentUser.set({
        email: 'dev.student@adrar-numerique.fr',
        uid: 'uid_98f72a1c',
      });
    }
  }

  updateDocTitle(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.newDocTitle.set(input.value);
  }

  simulateAddFirestoreDoc(event: Event): void {
    event.preventDefault();
    if (!this.currentUser()) {
      this.securityAlert.set(
        '⛔ FirebaseError (permission-denied) : Règle Firestore "allow write: if request.auth != null;" bloquée. Connectez-vous d’abord !',
      );
      return;
    }

    const title = this.newDocTitle().trim();
    if (!title) return;

    this.securityAlert.set(null);
    const randomId = 'doc_' + Math.random().toString(36).substring(2, 6);
    this.firestoreDocs.update((docs) => [
      { id: randomId, title, author: this.currentUser()!.email },
      ...docs,
    ]);
    this.newDocTitle.set('');
  }

  simulatePushRtdb(status: string): void {
    if (!this.currentUser()) {
      this.securityAlert.set(
        '⛔ Permission denied (Realtime Database) : Authentification requise pour écrire sur /users_presence.',
      );
      return;
    }

    this.securityAlert.set(null);
    const key = '-Nx' + Math.random().toString(36).substring(2, 6);
    this.rtdbNodes.update((nodes) => [
      { key, status, updatedAt: new Date().toLocaleTimeString() },
      ...nodes.slice(0, 3),
    ]);
  }

  simulateStorageUpload(): void {
    if (!this.currentUser()) {
      this.securityAlert.set(
        '⛔ Storage Unauthorized : Impossible d’uploader dans le bucket sans session utilisateur active.',
      );
      return;
    }

    if (this.isUploading()) return;

    this.securityAlert.set(null);
    this.isUploading.set(true);
    this.uploadProgress.set(0);
    this.uploadedFileUrl.set(null);

    const timer = setInterval(() => {
      this.uploadProgress.update((p) => {
        if (p >= 100) {
          clearInterval(timer);
          this.isUploading.set(false);
          this.uploadedFileUrl.set(
            `https://firebasestorage.googleapis.com/v0/b/adrar-app/o/avatars%2F${this.currentUser()?.uid}%2Fprofil.webp?alt=media`,
          );
          return 100;
        }
        return p + 25;
      });
    }, 300);
  }
}
