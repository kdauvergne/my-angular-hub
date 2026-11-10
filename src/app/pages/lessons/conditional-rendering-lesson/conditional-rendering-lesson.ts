import { Component } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { ShikiPipe } from '../../../pipes/shiki.pipe';

type UserRole = 'guest' | 'user' | 'admin';

@Component({
  selector: 'app-conditional-rendering-lesson',
  imports: [NgIf, AsyncPipe, ShikiPipe],
  styleUrl: './conditional-rendering-lesson.css',
  templateUrl: './conditional-rendering-lesson.html',
})
export class ConditionalRenderingLesson {
  userRole: UserRole = 'guest';

  // Snippets de code pour Shiki
  codeOldSyntax: string = `<!-- ❌ Nécessite d'importer NgIf / CommonModule -->
<div *ngIf="userRole === 'admin'; else checkUser">
  <p>Accès Admin</p>
</div>

<ng-template #checkUser>
  <div *ngIf="userRole === 'user'; else guestBlock">
    <p>Espace Membre</p>
  </div>
</ng-template>

<ng-template #guestBlock>
  <p>Veuillez vous connecter</p>
</ng-template>`;

  codeNewSyntax: string = `<!-- ✅ Aucun import requis ! Directement intégré au compilateur -->
@if (userRole === 'admin') {
  <p>Accès Admin</p>
} @else if (userRole === 'user') {
  <p>Espace Membre</p>
} @else {
  <p>Veuillez vous connecter</p>
}`;

  setRole(role: UserRole): void {
    this.userRole = role;
  }
}
