import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user.service'; // import service

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  template:  `
    <ion-header>
      <ion-toolbar color="dark">
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs"></ion-back-button>
        </ion-buttons>
        <ion-title>Order Summary</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="dark" class="ion-padding">

      <!-- Shipping Address -->
      <ion-card class="address-card">
        <ion-item lines="none">
          <ion-icon name="location-outline" slot="start" color="success"></ion-icon>
          <ion-label>
            <h3>{{ shippingAddress.name }} <span>{{ shippingAddress.phone }}</span></h3>
            <p>{{ shippingAddress.address }}</p>
          </ion-label>
        </ion-item>
      </ion-card>

      <!-- Cart Items -->
      <ion-card *ngFor="let item of cartItems" class="cart-card">
        <div class="top-row">
          <img [src]="item.image" class="thumb" />
          <div class="details">
            <h2>{{ item.name }}</h2>
            <p>{{ item.quantity }} × ₱{{ item.price }}</p>
            <p class="discount">₱{{ item.originalPrice || (item.price + 200) }}</p>
          </div>
          <span class="subtotal">₱{{ item.price * item.quantity }}</span>
        </div>
      </ion-card>

      <!-- Shipping -->
      <div class="info-row">
        <span>Global standard shipping</span>
        <span class="free">Free</span>
      </div>

      <!-- Discount -->
      <div class="info-row">
        <span>Shop discount</span>
        <span>- ₱50.00</span>
      </div>

      <!-- Total -->
      <div class="total-row">
        <span>Total ({{ cartItems.length }} items)</span>
        <h2>₱{{ totalPrice - 50 }}</h2>
      </div>

      <!-- Payment Methods -->
      <h2 class="section-title">Payment Method</h2>
      <ion-card class="card">
        <ion-radio-group [(ngModel)]="paymentMethod">
          <ion-item *ngFor="let method of paymentMethods" lines="none">
            <ion-radio slot="start" [value]="method.value"></ion-radio>
            <ion-label>{{ method.label }}</ion-label>
          </ion-item>
        </ion-radio-group>
      </ion-card>
    </ion-content>

    <!-- Fixed footer button -->
    <ion-footer>
      <ion-toolbar color="dark">
        <div class="checkout-footer">
          <div class="total-text">
            <span>Total</span>
            <h2>₱{{ totalPrice - 50 }}</h2>
          </div>
          <ion-button expand="block" size="large" class="order-btn" (click)="placeOrder()">
            Place Order
          </ion-button>
        </div>
      </ion-toolbar>
    </ion-footer>
  `,
  styles: [`
    ion-content { --background: #121212; font-family: 'Poppins', sans-serif; color: #fff; }

    .address-card { background: #1f1f1f; border-radius: 12px; margin-bottom: 12px; padding: 8px; }
    .address-card h3 { margin: 0; font-weight: 600; }
    .address-card h3 span { font-size: 13px; color: #aaa; margin-left: 8px; }
    .address-card p { font-size: 14px; color: #bbb; margin-top: 4px; }

    .cart-card { background: linear-gradient(145deg, #1f1f1f, #292929); border-radius: 12px; margin-bottom: 12px; padding: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.4); }
    .top-row { display: flex; align-items: center; gap: 12px; }
    .thumb { width: 70px; height: 70px; border-radius: 8px; object-fit: cover; }
    .details { flex: 1; }
    .details h2 { margin: 0; font-size: 15px; font-weight: 600; color: #fff; }
    .details p { margin: 0; font-size: 13px; color: #ccc; }
    .discount { text-decoration: line-through; color: #777; font-size: 12px; }
    .subtotal { font-size: 14px; font-weight: 600; color: #3ac569; }

    .info-row { display: flex; justify-content: space-between; padding: 8px 4px; border-bottom: 1px solid rgba(255,255,255,0.1); font-size: 14px; }
    .free { color: #3ac569; font-weight: 600; }

    .total-row { display: flex; justify-content: space-between; align-items: center; margin: 12px 0; font-size: 16px; font-weight: 600; }
    .total-row h2 { margin: 0; color: #e60023; }

    .section-title { margin-top: 16px; font-size: 15px; font-weight: 600; color: #fff; }

    .card { background: #1e1e1e; border-radius: 12px; margin-bottom: 16px; }
    ion-radio-group ion-item { --background: #292929; border-radius: 8px; margin: 6px 0; }
    ion-radio-group ion-label { color: #fff; }

    .checkout-footer { display: flex; justify-content: space-between; align-items: center; gap: 12px; width: 100%; padding: 8px; }
    .total-text { display: flex; flex-direction: column; font-size: 14px; font-weight: 500; color: #ccc; }
    .total-text h2 { margin: 0; font-size: 18px; font-weight: 700; color: #fff; }
    .order-btn { flex: 1; --background: linear-gradient(135deg, #3ac569, #2ebf91); --color: #fff; --border-radius: 14px; font-weight: 600; height: 50px; }
  `]
})
export class CheckoutPage {
  cartItems: any[] = [];
  totalPrice: number = 0;
  paymentMethod: string = 'cod';
  paymentMethods = [
    { label: 'Cash on Delivery', value: 'cod' },
    { label: 'PayLater', value: 'paylater' },
    { label: 'Credit/Debit Card', value: 'card' }
  ];
  shippingAddress = { name: 'Jay Blanco', address: 'Blk 1 Lot 15 Tuguegarao', phone: '097xxxxxx02' };

  constructor(
    private router: Router,
    private userService: UserService,
    private toastController: ToastController // ✅ Inject ToastController here
  ) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { cartItems: any[], totalPrice: number };
    if (state) {
      this.cartItems = state.cartItems;
      this.totalPrice = state.totalPrice;
    }
  }

  async placeOrder() {
    const order = {
      name: `Order #${this.userService.getOrders().length + 1}`,
      date: new Date().toLocaleDateString(),
      total: this.totalPrice - 50,  // include discount
      items: this.cartItems
    };

    this.userService.addOrder(order);

    const toast = await this.toastController.create({
      message: '🛒 Order placed successfully!',
      duration: 2000,
      position: 'bottom',
      cssClass: 'custom-toast',
      mode: 'ios',
    });

    await toast.present();
  

    // Navigate back to tabs (optional)
    this.router.navigate(['/tabs']);
  }
}
