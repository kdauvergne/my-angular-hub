import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { ShikiPipe } from '../../../pipes/shiki.pipe';

@Component({
  selector: 'app-two-way-binding-lesson',
  imports: [FormsModule, AsyncPipe, ShikiPipe],
  templateUrl: './two-way-binding-lesson.html',
})
export class TwoWayBindingLesson {
  // Modèle de données (ViewModel)
  developerName: string = 'Ada Lovelace';
  favoriteLanguage: string = 'TypeScript';

  // Snippets de code pour Shiki
  codeNgModel: string = `<input type="text" [(ngModel)]="developerName" class="input input-bordered" />`;

  codeUnderTheHood: string = `<!-- La syntaxe [(ngModel)] est un sucre syntaxique combinant Property + Event Binding -->
<input
  [ngModel]="developerName"
  (ngModelChange)="developerName = $event"
/>`;

  codeFormsModule: string = `import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule], // Obligatoire pour utiliser [(ngModel)]
  // ...
})`;

  // Action métier depuis le TypeScript
  resetData(): void {
    this.developerName = '';
    this.favoriteLanguage = '';
  }
}
