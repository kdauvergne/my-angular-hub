import { computed, Service, signal } from '@angular/core';
import { CartItem, Product } from '../models/shop.model';

@Service()
export class CartService {
  private readonly _items = signal<CartItem[]>([]);
  readonly items = this._items.asReadonly();

  totalQuantity = computed(() => this._items().reduce((total, item) => total + item.quantity, 0));

  subtotal = computed(() =>
    this._items().reduce((total, item) => total + item.product.price * item.quantity, 0),
  );

  addProduct(product: Product): void {
    const items = [...this._items()];
    const existing = items.find((item) => item.product.id === product.id);

    if (existing) {
      if (existing.quantity >= product.stock) return;
      existing.quantity++;
    } else {
      if (product.stock <= 0) return;
      items.push({ product, quantity: 1 });
    }

    this._items.set(items);
  }

  updateQuantity(productId: number, delta: number): void {
    const items = [...this._items()];
    const existing = items.find((item) => item.product.id === productId);

    if (!existing) return;

    const newQuantity = existing.quantity + delta;

    if (newQuantity <= 0) {
      this.removeProduct(productId);
      return;
    }
    if (newQuantity > existing.product.stock) return;

    existing.quantity = newQuantity;
    this._items.set(items);
  }

  removeProduct(productId: number): void {
    this._items.update((list) => list.filter((item) => item.product.id !== productId));
  }

  clearCart(): void {
    this._items.set([]);
  }
}
