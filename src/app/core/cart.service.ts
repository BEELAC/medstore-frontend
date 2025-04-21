import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: any[] = [];

  // Add a product to the cart
  add(product: any): void {
    this.items.push(product);
  }

  // Get all items in the cart
  getItems(): any[] {
    return this.items;
  }

  // Clear the cart
  clear(): void {
    this.items = [];
  }

  remove(productId: number): void {
    this.items = this.items.filter(item => item.id !== productId);
  }
}
