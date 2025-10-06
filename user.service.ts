import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    orders: [] as any[],
    wishlist: [] as any[]
  };

  constructor() {}

  // Getters
  getUser() {
    return this.user;
  }

  getOrders() {
    return this.user.orders;
  }

  getWishlist() {
    return this.user.wishlist;
  }

  // Actions
  addOrder(order: { name: string; date: string; total: number }) {
    this.user.orders.unshift(order); // newest first
  }

  addToWishlist(item: { name: string; price: number }) {
    this.user.wishlist.push(item);
  }

  removeFromWishlist(index: number) {
    this.user.wishlist.splice(index, 1);
  }
}
