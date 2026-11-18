import { Component, signal } from '@angular/core';
import { AnimalCard, Animal } from '../../../components/animal-card/animal-card';

@Component({
  imports: [AnimalCard],
  selector: 'app-exercice-animal-input',
  styleUrl: './exercice-animal-input.css',
  templateUrl: './exercice-animal-input.html',
})
export class ExerciceAnimalInput {
  readonly animals = signal<Animal[]>([
    { id: 1, name: 'Rex', species: 'chien', age: 3, energyLevel: 85, isAdopted: false },
    { id: 2, name: 'Pixel', species: 'chat', age: 2, energyLevel: 45, isAdopted: true },
    { id: 3, name: 'Noisette', species: 'lapin', age: 1, energyLevel: 30, isAdopted: false },
    { id: 4, name: 'Kiwi', species: 'oiseau', age: 4, energyLevel: 70, isAdopted: false },
    { id: 5, name: 'Luna', species: 'chat', age: 6, energyLevel: 20, isAdopted: false },
    { id: 6, name: 'Oslo', species: 'chien', age: 1, energyLevel: 95, isAdopted: true },
  ]);
}
