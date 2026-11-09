import { Component } from '@angular/core';

interface Users {
  firstName: string;
  lastName: string;
  role: string;
  isLoggedIn: boolean;
  getFullName: () => string;
}

@Component({
  imports: [],
  selector: 'app-exercice-text-interpolation',
  styleUrl: './exercice-text-interpolation.css',
  templateUrl: './exercice-text-interpolation.html',
})
export class ExerciceTextInterpolation {
  // Données

  maxScore: number = 20;
  currentScore: number = 15;

  user: Users = {
    firstName: 'Alexandre',
    lastName: 'DUPONT',
    role: 'DEV',
    isLoggedIn: false,
    getFullName: function (): string {
      return `${this.firstName} ${this.lastName}`;
    },
  };

  skills: string[] = ['Angular 22', 'TypeScript', 'DaisyUI'];
}
