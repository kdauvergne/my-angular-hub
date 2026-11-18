import { Component, computed, input, output } from '@angular/core';

export interface Animal {
  id: number;
  name: string;
  species: string;
  age: number;
  energyLevel: number;
  isAdopted: boolean;
}

@Component({
  imports: [],
  selector: 'app-animal-card',
  styleUrl: './animal-card.css',
  templateUrl: './animal-card.html',
})
export class AnimalCard {
  //* propriétés d'entrée nécessaires (input)
  id = input.required<number>();
  name = input.required<string>();
  species = input.required<string>();
  age = input<number>(2);
  energyLevel = input<number>(50);
  isAdopted = input<boolean>(false);

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
