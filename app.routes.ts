import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/home', // <-- Make Tab1 (home) the default page
    pathMatch: 'full',
  },
  {
    path: 'signin',
    loadComponent: () => import('./auth/signin.page').then(m => m.SigninPage),
  },
  {
    path: 'signup',
    loadComponent: () => import('./auth/signup.page').then(m => m.SignupPage),
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then(m => m.routes),
  },
  {
    path: 'checkout',
    loadComponent: () => import('./checkout.page').then(m => m.CheckoutPage),
  },
  {
    path: 'orders',
    loadComponent: () => import('./orders.page').then(m => m.OrdersPage),
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./wishlist.page').then(m => m.WishlistPage),
  },
  // ✅ Category route
  {
    path: 'category/:name',
    loadComponent: () => import('./pages/category/category.page').then(m => m.CategoryPage),
  },
  {
    path: '**',
    redirectTo: 'tabs/home', // fallback to Tab1 if route not found
    pathMatch: 'full',
  },
];
