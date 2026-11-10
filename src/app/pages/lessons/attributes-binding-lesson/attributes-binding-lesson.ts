import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ShikiPipe } from '../../../pipes/shiki.pipe';

@Component({
  selector: 'app-attributes-binding-lesson',
  imports: [AsyncPipe, ShikiPipe],
  styleUrl: './attributes-binding-lesson.css',
  templateUrl: './attributes-binding-lesson.html',
})
export class AttributesBindingLesson {
  // 🟦 Variables pour Property Binding
  imageUrl: string = 'https://placehold.co/300x200?text=Image+Property';
  buttonDisabled: boolean = true;
  inputPlaceholder: string = 'Veuillez saisir votre texte ici...';

  // 🟧 Variables pour Attribute Binding
  ariaLabel: string = 'Bouton d’action principal';
  customAttr: string = 'valeur-dynamique-123';

  // 📜 Snippets de code pour Shiki
  codeImgProperty: string = `<img [src]="imageUrl" alt="Image property binding" />`;
  codeButtonDisabled: string = `<button [disabled]="buttonDisabled">Bouton dépendant d'un état</button>`;
  codeInputPlaceholder: string = `<input [placeholder]="inputPlaceholder" class="input input-bordered" />`;
  codeAttributeBinding: string = `<button
  [attr.aria-label]="ariaLabel"
  [attr.data-custom]="customAttr">
  Bouton avec attributs ARIA & Data
</button>`;

  // 🟨 Méthodes
  toggleButton(): void {
    this.buttonDisabled = !this.buttonDisabled;
  }
}
