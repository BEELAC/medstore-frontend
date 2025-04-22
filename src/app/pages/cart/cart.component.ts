import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { CartService } from '../../core/cart.service';
import { UserStateService } from '../../core/user-state.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];

  constructor(
    private cartService: CartService,
    private http: HttpClient,
    private userState: UserStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getItems();
  }

  removeFromCart(productId: number): void {
    this.cartService.remove(productId);
    this.cartItems = this.cartService.getItems();
  }

  clearCart(): void {
    this.cartService.clear();
    this.cartItems = [];
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }

  checkout(): void {
    const userId = this.userState.getUserId();
    if (!userId) {
      alert('You must be logged in to check out.');
      return;
    }

    this.router.navigate(['/checkout']);
  }
}
