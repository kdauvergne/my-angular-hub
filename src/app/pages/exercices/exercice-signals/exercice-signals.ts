import { Component, computed, effect, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-exercice-signals',
  styleUrl: './exercice-signals.css',
  templateUrl: './exercice-signals.html',
})
export class ExerciceSignals {
  constructor() {
    effect(() => {
      const cart = {
        quantity: this.quantity(),
        unitPrice: this.unitPrice(),
        discountPercent: this.discountPercent(),
        isExpressShipping: this.isExpressShipping(),
        total: this.total(),
      };
      console.log('Panier :', cart);
      localStorage.setItem('cart_demo_signals', JSON.stringify(cart));
    });
  }

  // déclaration des signals d'état
  quantity = signal(1);
  unitPrice = signal(35);
  discountPercent = signal<0 | 10 | 20>(0);
  isExpressShipping = signal(false);

  // signals computed
  subtotal = computed(() => this.quantity() * this.unitPrice());
  discountAmount = computed(() => (this.subtotal() * this.discountPercent()) / 100);

  shippingFee = computed(() => {
    if (this.quantity() === 0) {
      return 0;
    }
    if (this.isExpressShipping()) {
      return 12;
    }
    if (this.subtotal() >= 100) {
      return 0;
    }
    return 5;
  });

  // sans descendre en dessous de 0 avec Math.max
  total = computed(() => {
    return Math.max(0, this.subtotal() + this.shippingFee() - this.discountAmount());
  });

  // Méthodes d'action

  incrementQuantity(): void {
    this.quantity.update((val) => val + 1);
  }

  decrementQuantity(): void {
    this.quantity.update((val) => Math.max(0, val - 1));
  }

  setDiscount(percent: 0 | 10 | 20): void {
    this.discountPercent.set(percent);
  }

  toggleExpressShipping(): void {
    this.isExpressShipping.update((val) => !val);
  }

  resetCart(): void {
    this.quantity.set(1);
    this.unitPrice.set(35);
    this.discountPercent.set(0);
    this.isExpressShipping.set(false);
  }
}
