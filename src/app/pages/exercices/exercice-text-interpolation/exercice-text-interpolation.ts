import { Component } from '@angular/core';

interface Users {
  firstName: string;
  lastName: string;
  role: string;
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
  };

  isLoggedIn: boolean = false;

  getFullName(): string {
    return `${this.user.firstName} ${this.user.lastName}`;
  }

  skills: string[] = ['Angular 22', 'TypeScript', 'DaisyUI'];
}
