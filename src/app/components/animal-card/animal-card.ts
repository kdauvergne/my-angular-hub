import { Component, computed, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-animal-card',
  styleUrl: './animal-card.css',
  templateUrl: './animal-card.html',
})
export class AnimalCard {
  //* propriétés d'entrée nécessaires (input)

  // propriétés obligatoires
  readonly name = input.required<string>();
  readonly species = input.required<string>();

  // propriétés optionnelles avec valeurs par défaut
  readonly age = input<number>(2);
  readonly energyLevel = input<number>(50);
  readonly isAdopted = input<boolean>(false);

  // affichage émoji selon la race
  emoji = computed(() => {
    switch (this.species()) {
      case 'chien':
        return '🐶';
      case 'chat':
        return '🐱';
      case 'lapin':
        return '🐰';
      case 'oiseau':
        return '🦜';
      default:
        return '🐾';
    }
  });

  // âge ('an' ou 'ans')

  accordAge = computed(() => (this.age() > 1 ? `${this.age()} ans` : `${this.age()} an`));

  //* sorties d'évènement (output)

  // basculer la statut d'adoption
  statusChange = output<void>();

  // modifier le niveau d'énergie
  energyChange = output<number>();
}
