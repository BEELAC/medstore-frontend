import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private loggedIn = false;
  private admin = false;
  private userId = 0;
  private email = '';

  login(user: { email: string; isAdmin: boolean; userId: number }): void {
    this.loggedIn = true;
    this.admin = user.isAdmin;
    this.userId = user.userId;
    this.email = user.email;

    localStorage.setItem('user', JSON.stringify(user));
  }

  restoreFromStorage(): void {
    const saved = localStorage.getItem('user');
    if (saved) {
      const user = JSON.parse(saved);
      this.loggedIn = true;
      this.admin = user.isAdmin;
      this.userId = user.userId;
      this.email = user.email;
    }
  }

  logout(): void {
    this.loggedIn = false;
    this.admin = false;
    this.userId = 0;
    this.email = '';
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  isAdmin(): boolean {
    return this.admin;
  }

  getUserId(): number {
    return this.userId;
  }

  getEmail(): string {
    return this.email;
  }
}
