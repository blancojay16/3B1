import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orders: any[] = [];

  constructor() {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      this.orders = JSON.parse(savedOrders);
    }
  }

  addOrder(order: any) {
    this.orders.push(order);
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }

  getOrders() {
    return this.orders;
  }

  clearOrders() {
    this.orders = [];
    localStorage.removeItem('orders');
  }
}
