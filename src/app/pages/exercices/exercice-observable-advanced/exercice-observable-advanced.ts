import { Component, OnDestroy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, Subscription, interval } from 'rxjs';

@Component({
  imports: [FormsModule],
  selector: 'app-exercice-observable-advanced',
  styleUrl: './exercice-observable-advanced.css',
  templateUrl: './exercice-observable-advanced.html',
})
export class ExerciceObservableAdvanced implements OnDestroy {
  readonly myObservable$: Observable<number> = interval(1000);

  // État réactif de la démonstration
  numbers = signal<{ value: number; label: string }[]>([]);
  filterEven = signal<boolean>(true);
  paused = signal<boolean>(false);

  // Gestion manuelle de la souscription
  private subscription: Subscription | null = null;

  start(): void {
    // empêche de lancer si un compteur tourne déjà
    if (!this.subscription) {
      // stocke la référence dans subscription

      // Interval RxJS qui émet toutes les secondes
      this.subscription = interval(1000).subscribe({
        next: () => {
          if (!this.paused()) {
            // génère un nombre aléatoire
            const random = Math.floor(Math.random() * 100) + 1;

            console.log(random);

            // filtre checkbox (si le filtre est coché et que le chiffre random est impair, on interrompt le traitement en return)
            if (this.filterEven() && random % 2 !== 0) {
              return;
            }

            // on update le tableau d'objets numbers en le copiant (car c'est un signal)
            this.numbers.update((list) => {
              const copyNumbers = [...list];

              if (copyNumbers.length >= 10) {
                copyNumbers.shift();
              }

              copyNumbers.push({ value: random, label: random > 50 ? 'Élevé' : 'Faible' });

              return copyNumbers;
            });
          }
        },
      });
    }
  }

  pauseResume(): void {
    this.paused.update((isPaused) => !isPaused);
    if (this.paused()) {
      this.stopSubscription();
    } else {
      this.start();
    }
  }

  stopSubscription(): void {
    this.subscription?.unsubscribe();
    this.subscription = null;
  }

  stop(): void {
    this.stopSubscription();
    this.numbers.set([]);
    this.paused.set(false);
  }

  ngOnDestroy(): void {
    this.stopSubscription();
  }
}
