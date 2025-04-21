import { Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { CartComponent } from './pages/cart/cart.component';


export const routes: Routes = [
    { path: 'admin/products', component: AdminComponent },
    { path: 'products', component: ProductListComponent },
    { path: 'cart', component: CartComponent }

];
