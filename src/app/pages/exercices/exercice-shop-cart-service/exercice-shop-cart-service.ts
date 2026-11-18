import { Component, computed, inject, signal } from '@angular/core';
import { Product, ProductCategory } from '../../../models/shop.model';
import { CartService } from '../../../services/cart';
@Component({
  imports: [],
  selector: 'app-exercice-shop-cart-service',
  styleUrl: './exercice-shop-cart-service.css',
  templateUrl: './exercice-shop-cart-service.html',
})
export class ExerciceShopCartService {
  // Améliorer avec un bon gros LocalStorage.
  readonly cartService = inject(CartService);

  readonly products = signal<Product[]>([
    {
      id: 1,
      name: 'Clavier Mécanique 75%',
      price: 89.9,
      category: 'hardware',
      stock: 4,
      icon: '⌨️',
    },
    {
      id: 2,
      name: 'Formation Angular 22 Pro',
      price: 149.0,
      category: 'formation',
      stock: 10,
      icon: '🚀',
    },
    {
      id: 3,
      name: 'Mug Développeur TypeScript',
      price: 14.5,
      category: 'goodies',
      stock: 8,
      icon: '☕',
    },
    {
      id: 4,
      name: 'Souris Ergonomique Sans-Fil',
      price: 59.0,
      category: 'hardware',
      stock: 3,
      icon: '🖱️',
    },
    {
      id: 5,
      name: 'Atelier Cybersécurité & Cloud',
      price: 199.0,
      category: 'formation',
      stock: 5,
      icon: '🛡️',
    },
    {
      id: 6,
      name: 'Pack Stickers Angular & Linux',
      price: 6.0,
      category: 'goodies',
      stock: 15,
      icon: '🏷️',
    },
  ]);

  readonly selectedCategory = signal<ProductCategory | 'all'>('all');
  readonly promoInput = signal<string>('');
  readonly promoStatus = signal<'idle' | 'valid' | 'invalid'>('idle');
  readonly orderConfirmed = signal<boolean>(false);

  readonly filteredProducts = computed(() => {
    const category = this.selectedCategory();
    if (category === 'all') return this.products();
    return this.products().filter((p) => p.category === category);
  });

  getQuantityInCart(productId: number): number {
    return this.cartService.items().find((item) => item.product.id === productId)?.quantity ?? 0;
  }

  onPromoInput(event: Event): void {
    this.promoInput.set((event.target as HTMLInputElement).value);
  }

  submitPromo(event: Event): void {
    event.preventDefault();
    const isValid = this.cartService.applyPromoCode(this.promoInput());
    this.promoStatus.set(isValid ? 'valid' : 'invalid');
  }

  checkout(): void {
    this.cartService.clearCart();
    this.promoInput.set('');
    this.promoStatus.set('idle');
    this.orderConfirmed.set(true);
    setTimeout(() => this.orderConfirmed.set(false), 3500);
  }
}
