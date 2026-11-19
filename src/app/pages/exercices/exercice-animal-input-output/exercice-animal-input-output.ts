import { Component, signal, computed } from '@angular/core';
import { AnimalCard } from '../../../components/animal-card/animal-card';

interface Animal {
  id: number;
  name: string;
  species: string;
  age: number;
  energyLevel: number;
  isAdopted: boolean;
}

@Component({
  imports: [AnimalCard],
  selector: 'app-exercice-animal-input-output',
  styleUrl: './exercice-animal-input-output.css',
  templateUrl: './exercice-animal-input-output.html',
})
export class ExerciceAnimalInputOutput {
  readonly animals = signal<Animal[]>([
    { id: 1, name: 'Rex', species: 'chien', age: 3, energyLevel: 85, isAdopted: false },
    { id: 2, name: 'Pixel', species: 'chat', age: 2, energyLevel: 45, isAdopted: true },
    { id: 3, name: 'Noisette', species: 'lapin', age: 1, energyLevel: 30, isAdopted: false },
    { id: 4, name: 'Kiwi', species: 'oiseau', age: 4, energyLevel: 70, isAdopted: false },
    { id: 5, name: 'Luna', species: 'chat', age: 6, energyLevel: 20, isAdopted: false },
    { id: 6, name: 'Oslo', species: 'chien', age: 1, energyLevel: 95, isAdopted: true },
  ]);

  // Log des actions pour le bandeau
  lastActionLog = signal<string>('Aucune action enregistrée.');

  handleStatusChange(animalId: number): void {
    this.animals.update((list) =>
      list.map((animal) =>
        animal.id === animalId ? { ...animal, isAdopted: !animal.isAdopted } : animal,
      ),
    );

    console.log("changement de statut d'adoption");

    const oneAnimal = this.animals().find((animal) => animal.id === animalId);
    this.lastActionLog.set(
      `Réaction du parent : ${oneAnimal?.name} statut ➔ ${oneAnimal?.isAdopted ? 'Adopté' : 'Pas adopté'} `,
    );
  }

  handleEnergyChange(animalId: number, amount: number): void {
    this.animals.update((list) =>
      list.map((animal) =>
        animal.id === animalId
          ? { ...animal, energyLevel: Math.min(100, Math.max(0, animal.energyLevel + amount)) }
          : animal,
      ),
    );
    console.log('Energie mise à jour');

    const oneAnimal = this.animals().find((animal) => animal.id === animalId);
    const action = amount > 0 ? 'joue' : 'fait la sieste';
    this.lastActionLog.set(
      `Réaction du parent : ${oneAnimal?.name} ${action} ➔ énergie ${oneAnimal?.energyLevel} %`,
    );
  }

  // calcul du nombre d'animaux adoptés
  adoptedCount = computed(() => this.animals().filter((animal) => animal.isAdopted).length);

  // calcul du nombre d'animaux à adopter
  availableCount = computed(() => this.animals().filter((animal) => !animal.isAdopted).length);
}
