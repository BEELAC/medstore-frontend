import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { CartService } from '../../core/cart.service';
import { UserStateService } from '../../core/user-state.service';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  cartItems: Product[] = [];
  checkoutForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private userState: UserStateService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getItems();

    // create the form
    this.checkoutForm = this.fb.group({
      paymentMethod: ['card', Validators.required]
    });
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }

  submitOrder(): void {
    const userId = this.userState.getUserId();
    if (!userId) {
      alert('You must be logged in to place an order.');
      return;
    }

    const orderPayload = {
      userId: userId,
      paymentMethod: this.checkoutForm.value.paymentMethod,
      paymentStatus: 'confirmed',
      amount: this.getTotal(),
      orderStatus: 'successful',
      items: this.cartItems.map(item => ({
        productId: item.id,
        quantity: 1,
        price: item.price
      }))
    };

    console.log("Sending orderPayload:", orderPayload)
    this.http.post('http://localhost:8081/orders', orderPayload, {
      withCredentials: true
    }).subscribe({
      next: () => {
        alert('Order placed successfully!');
        this.cartService.clear();
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Failed to place order:', err);
        alert('Failed to place order.');
      }
    });
  }
}
