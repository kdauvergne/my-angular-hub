import { Component, OnDestroy, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable, Subscription, interval } from 'rxjs';
import { ShikiPipe } from '../../../pipes/shiki.pipe';

@Component({
  selector: 'app-observables-lesson',
  imports: [AsyncPipe, ShikiPipe],
  styleUrl: './observables-lesson.css',
  templateUrl: './observables-lesson.html',
})
export class ObservablesLesson implements OnDestroy {
  readonly myObservable$: Observable<number> = interval(1000);

  // État réactif de la démonstration
  counterValue = signal<number | null>(null);
  streamStatus = signal<'IDLE' | 'RUNNING' | 'COMPLETED' | 'ERROR' | 'UNSUBSCRIBED'>('IDLE');
  logs = signal<string[]>([]);

  // Gestion manuelle de la souscription
  private intervalSub: Subscription | null = null;

  // Snippets de code bruts pour Shiki
  observerCode: string = `// 1. Structure de l'Observer ({ next, error, complete })
const myObservable$ = new Observable<string>((subscriber) => {
  subscriber.next('Première valeur');
  subscriber.next('Deuxième valeur');

  // Un flux se termine soit par complete(), soit par error()
  subscriber.complete();
});

myObservable$.subscribe({
  next: (val) => console.log('Reçu :', val),
  error: (err) => console.error('Erreur :', err),
  complete: () => console.log('Flux terminé !')
});`;

  intervalCode: string = `// 2. Opérateur interval() et désabonnement manuel
import { interval, Subscription } from 'rxjs';

// Émet un nombre toutes les 1000ms (0, 1, 2, ...)
const timer$ = interval(1000);

const sub: Subscription = timer$.subscribe({
  next: (value) => console.log('Tick :', value),
  error: (err) => console.error('Erreur :', err),
  complete: () => console.log('Terminé')
});

// ⚠️ NETTOYAGE : Obligatoire pour éviter les fuites mémoire !
function stopTimer() {
  sub.unsubscribe();
}`;

  modernCleanupCode: string = `// 3. Bonne pratique Angular (takeUntilDestroyed - Angular 16+)
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

@Component({ ... })
export class MyComponent {
  constructor() {
    // Se désabonne AUTOMATIQUEMENT quand le composant est détruit
    interval(1000)
      .pipe(takeUntilDestroyed())
      .subscribe((val) => console.log(val));
  }
}`;

  // --- Actions de la démo ---

  startInterval(): void {
    this.stopInterval(false); // Réinitialise si un interval tourne déjà

    this.streamStatus.set('RUNNING');
    this.addLog('🚀 Souscription démarrée (interval(1000))');

    // Interval RxJS qui émet toutes les secondes
    this.intervalSub = interval(1000).subscribe({
      next: (val) => {
        this.counterValue.set(val);
        this.addLog(`NEXT ➔ Émission : ${val}`);
      },
      error: (err) => {
        this.streamStatus.set('ERROR');
        this.addLog(`ERROR ➔ Erreur capturée : ${err}`);
      },
      complete: () => {
        this.streamStatus.set('COMPLETED');
        this.addLog('COMPLETE ➔ Le flux est terminé');
      },
    });
  }

  triggerCustomObservable(type: 'complete' | 'error'): void {
    this.stopInterval(false);
    this.streamStatus.set('RUNNING');
    this.counterValue.set(null);

    const customStream$ = new Observable<number>((subscriber) => {
      this.addLog('🚀 Début du flux personnalisé');
      subscriber.next(10);
      subscriber.next(20);

      if (type === 'error') {
        subscriber.error('Une erreur réseau est survenue !');
      } else {
        subscriber.next(30);
        subscriber.complete();
      }
    });

    customStream$.subscribe({
      next: (val) => {
        this.counterValue.set(val);
        this.addLog(`NEXT ➔ Valeur reçue : ${val}`);
      },
      error: (err) => {
        this.streamStatus.set('ERROR');
        this.addLog(`ERROR ➔ ${err}`);
      },
      complete: () => {
        this.streamStatus.set('COMPLETED');
        this.addLog('COMPLETE ➔ Flux clôturé avec succès');
      },
    });
  }

  stopInterval(logAction = true): void {
    if (this.intervalSub && !this.intervalSub.closed) {
      this.intervalSub.unsubscribe();
      this.streamStatus.set('UNSUBSCRIBED');
      if (logAction) {
        this.addLog('🛑 Unsubscribe exécuté (Souscription coupée)');
      }
    }
  }

  clearLogs(): void {
    this.logs.set([]);
    this.counterValue.set(null);
    this.streamStatus.set('IDLE');
  }

  private addLog(message: string): void {
    const timestamp = new Date().toLocaleTimeString();
    this.logs.update((current) => [`[${timestamp}] ${message}`, ...current.slice(0, 8)]);
  }

  ngOnDestroy(): void {
    // Nettoyage automatique si le composant est détruit
    this.stopInterval(false);
  }
}
