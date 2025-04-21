import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  products: any[] = [];
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: ['', [Validators.required, Validators.min(0)]],
      imageUrl: [''],
      quantity: ['', [Validators.required, Validators.min(0)]],
      categoryId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.http.get<any[]>('http://localhost:8081/products').subscribe({
      next: (data) => (this.products = data),
      error: (err) => console.error('Failed to load products', err)
    });
  }

  addProduct(): void {
    if (this.productForm.invalid) return;

    this.http.post('http://localhost:8081/products', this.productForm.value).subscribe({
      next: () => {
        this.productForm.reset();
        this.loadProducts();
      },
      error: (err) => console.error('Failed to add product', err)
    });
  }

  deleteProduct(id: number): void {
    this.http.delete(`http://localhost:8081/products/${id}`).subscribe({
      next: () => this.loadProducts(),
      error: (err) => console.error('Failed to delete product', err)
    });
  }
}

