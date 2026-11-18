import { Service, computed, signal } from '@angular/core';
import { CartItem, Product } from '../models/shop.model';

@Service()
export class CartService {
  // État privé : impossible à modifier directement depuis un composant
  private readonly _items = signal<CartItem[]>([]);
  private readonly _promoCode = signal<string | null>(null);

  // Exposition publique en lecture seule
  readonly items = this._items.asReadonly();
  readonly promoCode = this._promoCode.asReadonly();

  // Valeurs dérivées calculées automatiquement
  readonly totalQuantity = computed(() =>
    this._items().reduce((sum, item) => sum + item.quantity, 0),
  );

  readonly subtotal = computed(() =>
    this._items().reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  );

  readonly discount = computed(() => (this._promoCode() === 'ADRAR20' ? this.subtotal() * 0.2 : 0));

  readonly total = computed(() => Math.max(0, this.subtotal() - this.discount()));

  addProduct(product: Product): void {
    this._items.update((currentItems) => {
      const existing = currentItems.find((item) => item.product.id === product.id);

      if (existing) {
        if (existing.quantity >= product.stock) return currentItems;
        return currentItems.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      if (product.stock <= 0) return currentItems;
      return [...currentItems, { product, quantity: 1 }];
    });
  }

  updateQuantity(productId: number, delta: number): void {
    this._items.update((currentItems) =>
      currentItems
        .map((item) => {
          if (item.product.id !== productId) return item;
          const nextQty = Math.min(item.product.stock, item.quantity + delta);
          return { ...item, quantity: nextQty };
        })
        .filter((item) => item.quantity > 0),
    );
  }

  removeProduct(productId: number): void {
    this._items.update((items) => items.filter((item) => item.product.id !== productId));
  }

  applyPromoCode(rawCode: string): boolean {
    const normalized = rawCode.trim().toUpperCase();
    if (normalized === 'ADRAR20') {
      this._promoCode.set(normalized);
      return true;
    }
    this._promoCode.set(null);
    return false;
  }

  clearCart(): void {
    this._items.set([]);
    this._promoCode.set(null);
  }
}
