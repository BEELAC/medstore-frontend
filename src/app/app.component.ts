import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { LoginModalComponent } from './shared/components/login-modal/login-modal.component';
import { UserStateService } from './core/user-state.service';
import { AuthGuard } from './core/auth.guard';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent, LoginModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  showLogin = false;

  openLogin() {
    console.log('openLogin() called');
    this.showLogin = true;
  }

  closeLogin() {
    console.log('closeLogin() called');
    this.showLogin = false;
  }

  constructor(private userState: UserStateService) {
    this.userState.restoreFromStorage();
  }
}

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] }
  // add more if needed
];
