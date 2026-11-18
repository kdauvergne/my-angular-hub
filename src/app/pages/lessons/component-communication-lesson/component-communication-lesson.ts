import { Component, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ShikiPipe } from '../../../pipes/shiki.pipe';
import { UserCardLesson, UserProfile } from '../user-card-lesson/user-card-lesson';

@Component({
  selector: 'app-component-communication-lesson',
  imports: [UserCardLesson, AsyncPipe, ShikiPipe],
  styleUrl: './component-communication-lesson.css',
  templateUrl: './component-communication-lesson.html',
})
export class ComponentCommunicationLesson {
  // État réactif de la démonstration
  users = signal<UserProfile[]>([
    { id: 1, name: 'Alice Dupont', role: 'Développeuse Fullstack', isActive: true },
    { id: 2, name: 'Bob Martin', role: 'Lead Tech Angular', isActive: false },
    { id: 3, name: 'Charlie Durand', role: 'DevOps Engineer', isActive: true },
  ]);

  lastActionLog = signal<string>('Aucune action enregistrée.');

  // Snippets de code bruts pour Shiki
  decoratorCode: string = `// 👴 ANCIENNE SYNTAXE (Décorateurs @Input / @Output)
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({ ... })
export class UserCardComponent {
  // Entrée de données
  @Input({ required: true }) user!: UserProfile;

  // Événement émis vers le parent
  @Output() statusChange = new EventEmitter<number>();

  toggleStatus(): void {
    this.statusChange.emit(this.user.id);
  }
}`;

  signalCode: string = `// 🚀 NOUVELLE SYNTAXE (input() / output() - Angular 17.1+)
import { Component, input, output } from '@angular/core';

@Component({ ... })
export class UserCardComponent {
  // Entrée réactive basée sur un Signal (SignalInput)
  user = input.required<UserProfile>();

  // Événement moderne (OutputEmitterRef)
  statusChange = output<number>();

  toggleStatus(): void {
    this.statusChange.emit(this.user().id);
  }
}`;

  // Méthode exécutée lorsque l'enfant émet l'événement statusChange
  handleStatusChange(userId: number): void {
    this.users.update((list) =>
      list.map((u) => (u.id === userId ? { ...u, isActive: !u.isActive } : u)),
    );

    const user = this.users().find((u) => u.id === userId);
    this.lastActionLog.set(`Modifié : ${user?.name} ➔ ${user?.isActive ? 'Actif' : 'Inactif'}`);
  }
}
