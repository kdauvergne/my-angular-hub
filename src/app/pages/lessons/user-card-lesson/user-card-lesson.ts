import { Component, input, output } from '@angular/core';

export interface UserProfile {
  id: number;
  name: string;
  role: string;
  isActive: boolean;
}

@Component({
  imports: [],
  selector: 'app-user-card-lesson',
  styleUrl: './user-card-lesson.css',
  template: `
    <div class="card bg-base-100 border border-base-300 shadow-md">
      <div class="card-body p-4 flex flex-row items-center justify-between">
        <div>
          <h4 class="font-bold text-lg">{{ user().name }}</h4>
          <p class="text-xs text-base-content/70">{{ user().role }}</p>
        </div>
        <div class="flex items-center gap-3">
          <span
            class="badge"
            [class.badge-success]="user().isActive"
            [class.badge-ghost]="!user().isActive"
          >
            {{ user().isActive ? 'Actif' : 'Inactif' }}
          </span>
          <button class="btn btn-xs btn-outline btn-primary" (click)="toggleStatus()">
            Changer statut
          </button>
        </div>
      </div>
    </div>
  `,
})
export class UserCardLesson {
  // 📥 Entrée de données (Property Binding [user]="...")
  user = input.required<UserProfile>();

  // 📤 Sortie d'événement (Event Binding (statusChange)="..." )
  statusChange = output<number>();

  toggleStatus(): void {
    // Émission de l'ID vers le composant Parent
    this.statusChange.emit(this.user().id);
  }
}
