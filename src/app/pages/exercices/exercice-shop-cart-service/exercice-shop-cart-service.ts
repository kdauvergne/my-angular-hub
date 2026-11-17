import { Component, inject } from '@angular/core';
import { CartService } from '../../../services/cart';
import { Product } from '../../../models/shop.model';

@Component({
  imports: [],
  selector: 'app-exercice-shop-cart-service',
  styleUrl: './exercice-shop-cart-service.css',
  templateUrl: './exercice-shop-cart-service.html',
})
export class ExerciceShopCartService {
  readonly cartService = inject(CartService);

  products: Product[] = [
    {
      id: 1,
      name: 'Clavier Mécanique 75%',
      price: 89.9,
      category: 'hardware',
      stock: 2,
      icon: '⌨️',
    },
    {
      id: 2,
      name: 'Formation Angular 22 Pro',
      price: 149,
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
      price: 59,
      category: 'hardware',
      stock: 3,
      icon: '🖱️',
    },
    {
      id: 5,
      name: 'Formation Sécurité Web',
      price: 199,
      category: 'formation',
      stock: 5,
      icon: '🛡️',
    },
    { id: 6, name: 'Stickers Angular', price: 4.9, category: 'goodies', stock: 20, icon: '🏷️' },
  ];
}
