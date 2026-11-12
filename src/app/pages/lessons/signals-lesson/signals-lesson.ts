import { Component, signal, computed, effect } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ShikiPipe } from '../../../pipes/shiki.pipe';

@Component({
  selector: 'app-signals-lesson',
  imports: [AsyncPipe, ShikiPipe],
  styleUrl: './signals-lesson.css',
  templateUrl: './signals-lesson.html',
})
export class SignalsLesson {
  // 1. Signals Primitifs (État réactif de la démo)
  quantity = signal<number>(1);
  unitPrice = signal<number>(25);

  // 2. Signals Calculés (Dérivés et mis en cache automatiquement)
  totalPrice = computed(() => this.quantity() * this.unitPrice());
  discount = computed(() => (this.totalPrice() >= 100 ? 15 : 0));
  finalPrice = computed(() => this.totalPrice() - this.discount());

  // Historique des logs alimenté par l'effet
  effectLogs = signal<string[]>([]);

  // Snippets de code bruts pour Shiki
  signalCode: string = `// 1. Créer un Signal modifiable (WritableSignal)
const count = signal(0);

// Lire la valeur (fonction getter)
console.log(count()); // 0

// Remplacer la valeur
count.set(5);

// Mettre à jour en fonction de la valeur précédente
count.update(val => val + 1);`;

  computedCode: string = `// 2. Signal Calculé (Read-only & Caché)
const price = signal(10);
const quantity = signal(2);

// Se réévalue AUTOMATIQUEMENT quand price ou quantity change
const total = computed(() => price() * quantity());

console.log(total()); // 20`;

  effectCode: string = `// 3. Effet secondaire (Side Effect)
// S'exécute automatiquement au moins une fois et à chaque changement des signals lus à l'intérieur
effect(() => {
  console.log(\`Nouveau prix total : \${this.totalPrice()} €\`);
  localStorage.setItem('cart_total', this.totalPrice().toString());
});`;

  constructor() {
    // 3. Effet secondaire : surveille les modifications de la démo
    effect(() => {
      const logMessage = `[${new Date().toLocaleTimeString()}] Quantité : ${this.quantity()} | Total final : ${this.finalPrice()} €`;

      // Mise à jour de l'historique (conservation des 4 derniers logs)
      this.effectLogs.update((logs) => [logMessage, ...logs.slice(0, 3)]);
    });
  }

  // Actions utilisateur
  increment(): void {
    this.quantity.update((q) => q + 1);
  }

  decrement(): void {
    if (this.quantity() > 1) {
      this.quantity.update((q) => q - 1);
    }
  }

  updateUnitPrice(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.unitPrice.set(Number(input.value));
  }
}
