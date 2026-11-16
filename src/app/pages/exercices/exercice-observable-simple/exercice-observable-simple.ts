import { Component, OnDestroy, signal } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';

@Component({
  imports: [],
  selector: 'app-exercice-observable-simple',
  styleUrl: './exercice-observable-simple.css',
  templateUrl: './exercice-observable-simple.html',
})
export class ExerciceObservableSimple implements OnDestroy {
  readonly myObservable$: Observable<number> = interval(1000);

  // État réactif de la démonstration
  numbers = signal<number[]>([]);
  paused = signal<boolean>(false);
  logs = signal<string[]>([]);

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
            const random = Math.floor(Math.random() * 100) + 1;
            this.numbers.update((list) => [...list, random]);
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
