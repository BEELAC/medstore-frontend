import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../core/cart.service';
import { UserStateService } from '../../core/user-state.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(
    private http: HttpClient,
    private cart: CartService,
    private userState: UserStateService
  ) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8081/products')
    .subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Failed to load products', err)
    });
  }

  addToCart(product: any) {
    if (!this.userState.isLoggedIn()) {
      alert('You must be logged in to add items to your cart.');
      return;
    }

    this.cart.add(product);
    alert(`${product.name} added to cart!`);
  }
}
