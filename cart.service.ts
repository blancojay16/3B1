import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];

  getCartItems() {
    return this.cartItems;
  }

addToCart(item: any) {
  const existing = this.cartItems.find(i => i.name === item.name);
  if (existing) {
    existing.quantity += 1;
  } else {
    this.cartItems.push({
      ...item,
      image: item.image || item.img || '', // ✅ Ensure image path is copied
      quantity: 1
    });
  }
}


  removeFromCart(item: any) {
    this.cartItems = this.cartItems.filter(i => i !== item);
  }

  clearCart() {
    this.cartItems = [];
  }

  getTotal() {
    return this.cartItems.reduce((t, i) => t + i.price * i.quantity, 0);
  }
}
