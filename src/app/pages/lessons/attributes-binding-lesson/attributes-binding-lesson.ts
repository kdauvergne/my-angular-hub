import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-attributes-binding-lesson',
  styleUrl: './attributes-binding-lesson.css',
  templateUrl: './attributes-binding-lesson.html',
})
export class AttributesBindingLesson {

// lienDynamique :string='https://www.google.com'
    // 🟦 Variables pour Property Binding
    imageUrl:string = 'https://placehold.co/300x200?text=Image+Property';
    buttonDisabled:boolean = true;
    inputPlaceholder:string = 'Veuillez tapez votre texte ici';

    // 🟧 Variables pour Attribute Binding
    ariaLabel:string = 'Bouton important';
    customAttr:string = 'dynamique';

    // 🟨 Méthodes
    toggleButton():void {
      this.buttonDisabled = !this.buttonDisabled;
    }
}
