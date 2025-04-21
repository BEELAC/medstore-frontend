import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CartService } from '../../core/cart.service';
import { UserStateService } from '../../core/user-state.service';

interface Product {
  id: number;
  name: string;
  price: number;
}

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
    private userState: UserStateService
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
    console.log( 'User ID at checkout:', userId);
    if (!userId) {
      alert('You must be logged in to check out.');
      return;
    }

    const total = this.getTotal();
    const orderPayload = {
      userId: userId,
      paymentMethod: 'card',
      paymentStatus: 'confirmed',
      amount: total,
      orderStatus: 'successful',
      // items: this.cartItems.map((item) => ({
      //   productId: item.id,
      //   quantity: 1,
      //   price: item.price
      // }))
    };

    console.log('Placing order with payload:', orderPayload);

    this.http.post('http://localhost:8081/orders', orderPayload, {
      withCredentials: true
    }).subscribe({
      next: () => {
        alert('Order placed successfully!');
        this.clearCart();
      },
      error: (err) => {
        console.error('Failed to place order:', err);
        alert('Failed to place order.');
      }
    });
  }
}
