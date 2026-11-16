import { Component, signal } from '@angular/core';
import { AsyncPipe, NgClass, NgStyle } from '@angular/common';
import { ShikiPipe } from '../../../pipes/shiki.pipe';

@Component({
  selector: 'app-dynamic-styling-lesson',
  imports: [AsyncPipe, NgClass, NgStyle, ShikiPipe],
  styleUrl: './dynamic-styling-lesson.css',
  templateUrl: './dynamic-styling-lesson.html',
})
export class DynamicStylingLesson {
  // État réactif pour la démonstration interactive
  isOnline = signal<boolean>(true);
  isHighlighted = signal<boolean>(false);
  fontSize = signal<number>(16);
  customColor = signal<string>('#22c55e');

  // --- Snippets de code formatés via ShikiPipe ---

  ngClassCode: string = `// 👴 APPROCHE HISTORIQUE : Directive [ngClass]
import { Component, signal } from '@angular/core';
import { NgClass } from '@angular/common'; // Import obligatoire

@Component({
  imports: [NgClass],
  template: \`
    <div [ngClass]="{
      'border-success bg-success/10': isOnline(),
      'border-error bg-error/10': !isOnline(),
      'ring-2 ring-primary scale-[1.02]': isHighlighted()
    }">
      Statut du profil
    </div>
  \`
})
export class ProfileCardComponent {
  isOnline = signal(true);
  isHighlighted = signal(false);
}`;

  nativeClassCode: string = `// 🚀 APPROCHE MODERNE : Class Binding natif (Standard Angular)
import { Component, signal } from '@angular/core';
// Aucun import nécessaire !

@Component({
  template: \`
    <div
      [class.ring-2]="isHighlighted()"
      [class.ring-primary]="isHighlighted()"
      [class]="isOnline() ? 'border-success bg-success/10' : 'border-error bg-error/10'">
      Statut du profil
    </div>
  \`
})
export class ProfileCardComponent {
  isOnline = signal(true);
  isHighlighted = signal(false);
}`;

  ngStyleCode: string = `// 👴 APPROCHE HISTORIQUE : Directive [ngStyle]
import { Component, signal } from '@angular/core';
import { NgStyle } from '@angular/common'; // Import obligatoire

@Component({
  imports: [NgStyle],
  template: \`
    <p [ngStyle]="{
      'font-size.px': fontSize(),
      'color': customColor(),
      'border-left-color': customColor()
    }">
      Texte stylisé dynamiquement
    </p>
  \`
})
export class DynamicTextComponent {
  fontSize = signal(16);
  customColor = signal('#22c55e');
}`;

  nativeStyleCode: string = `// 🚀 APPROCHE MODERNE : Style Binding natif (Standard Angular)
import { Component, signal } from '@angular/core';
// Aucun import nécessaire !

@Component({
  template: \`
    <p
      [style.font-size.px]="fontSize()"
      [style.color]="customColor()"
      [style.--accent-color]="customColor()">
      Texte stylisé dynamiquement
    </p>
  \`
})
export class DynamicTextComponent {
  fontSize = signal(16);
  customColor = signal('#22c55e');
}`;

  // --- Actions de la démonstration ---

  toggleOnline(): void {
    this.isOnline.update((state) => !state);
  }

  toggleHighlight(): void {
    this.isHighlighted.update((state) => !state);
  }

  updateFontSize(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.fontSize.set(Number(input.value));
  }

  setColor(hex: string): void {
    this.customColor.set(hex);
  }
}
