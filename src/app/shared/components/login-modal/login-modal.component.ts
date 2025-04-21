import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserStateService } from '../../../core/user-state.service';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css'
})
export class LoginModalComponent {
  @Output() close = new EventEmitter<void>();

  loginForm: FormGroup;
  errorMessage: String = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private userState: UserStateService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  closeModal() {
    this.close.emit();
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const payload = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    console.log('Sending login request:', payload);

    this.http.post<any>('http://localhost:8081/auth/login', payload, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    }).subscribe({
      next: (response) => {
        console.log('Login successful:', response);

        // Save session info
        this.userState.login({
          email: response.email,
          isAdmin: response.isAdmin,
          userId: response.userId
        });

        alert(`Welcome ${response.email}!`);
        this.closeModal();
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.errorMessage = 'Invalid email or password';
      }
    });
  }
}
