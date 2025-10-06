import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-tab2',
  standalone: true,
  imports: [IonicModule, CommonModule],
  template: `
    <ion-header>
      <ion-toolbar color="dark">
        <ion-title>My Cart</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="dark" class="ion-padding">

      <!-- ✅ Empty cart message -->
      <div *ngIf="cartItems.length === 0" class="empty-cart">
        <ion-icon name="cart-outline" class="empty-icon"></ion-icon>
        <h2>Your cart is empty</h2>
        <p>Add some items to get started!</p>
      </div>

      <!-- ✅ Cart item list -->
      <ion-list *ngIf="cartItems.length > 0">
        <ion-card *ngFor="let item of cartItems" class="cart-card">
          <div class="top-row">
            <img [src]="item.img || item.image" class="thumb" />
            <div class="details">
              <h2>{{ item.name }}</h2>
              <p>{{ item.category || item.description }}</p>
              <div class="price">₱{{ item.price }}</div>
            </div>
            <ion-button fill="clear" color="danger" size="small" (click)="removeItem(item)">
              <ion-icon name="trash-outline"></ion-icon>
            </ion-button>
          </div>

          <div class="bottom-row">
            <div class="qty-controls">
              <ion-button fill="solid" color="success" size="small" (click)="decreaseQty(item)">
                <ion-icon name="remove-outline"></ion-icon>
              </ion-button>
              <span class="qty">{{ item.quantity }}</span>
              <ion-button fill="solid" color="success" size="small" (click)="increaseQty(item)">
                <ion-icon name="add-outline"></ion-icon>
              </ion-button>
            </div>
            <div class="subtotal">
              ₱{{ item.price * item.quantity }}
            </div>
          </div>
        </ion-card>
      </ion-list>

      <!-- ✅ Checkout button -->
      <div class="checkout-container" *ngIf="cartItems.length > 0">
        <ion-button expand="block" class="checkout-btn" (click)="checkout()">
          Checkout • ₱{{ getTotal() }}
        </ion-button>
      </div>
    </ion-content>
  `,
  styles: [`
    ion-content {
      --background: #121212;
      color: #fff;
    }

    /* ✅ Empty cart styling */
    .empty-cart {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 80%;
      text-align: center;
      color: #aaa;
    }

    .empty-icon {
      font-size: 80px;
      color: #3ac569;
      margin-bottom: 16px;
      opacity: 0.9;
    }

    .empty-cart h2 {
      font-weight: 600;
      color: #fff;
      margin-bottom: 6px;
    }

    .empty-cart p {
      font-size: 14px;
      color: #ccc;
    }

    .cart-card {
      background: linear-gradient(145deg, #1f1f1f, #292929);
      border-radius: 10px;
      margin-bottom: 20px;
      padding: 12px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.5);
    }

    .top-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .thumb {
      width: 70px;
      height: 70px;
      border-radius: 8px;
      object-fit: cover;
      box-shadow: 0 3px 10px rgba(0,0,0,0.4);
    }

    .details { flex: 1; display: flex; flex-direction: column; gap: 4px; }
    .details h2 { margin: 0; font-size: 15px; font-weight: 600; color: #fff; }
    .details p { margin: 0; font-size: 12px; color: #ccc; }
    .details .price { font-weight: 700; color: #3ac569; }

    .bottom-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
      padding-top: 8px;
      border-top: 1px solid rgba(58,197,105,0.2);
    }

    .qty-controls { display: flex; align-items: center; gap: 6px; }
    .qty {
      min-width: 28px;
      text-align: center;
      font-weight: bold;
      color: #fff;
      background: rgba(58,197,105,0.2);
      border-radius: 6px;
      padding: 2px 6px;
    }
    .subtotal {
      font-size: 14px;
      font-weight: 600;
      color: #3ac569;
      background: rgba(58,197,105,0.1);
      padding: 2px 6px;
      border-radius: 6px;
    }

    /* ✅ Checkout Button (matches Place Order) */
    .checkout-btn {
      --background: linear-gradient(90deg, #00ff99, #00c46b);
      --border-radius: 12px;
      --box-shadow: 0 6px 20px rgba(0, 255, 153, 0.4);
      font-weight: 600;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      transition: all 0.3s ease;
      --color: #fff;
    }

    .checkout-btn:hover {
      transform: scale(1.03);
      --box-shadow: 0 8px 25px rgba(0, 255, 153, 0.5);
    }

    .checkout-container {
      position: fixed;
      bottom: 16px;
      left: 16px;
      right: 16px;
      z-index: 100;
    }
  `]
})
export class Tab2Page {
  cartItems: any[] = [];

  constructor(private cartService: CartService, private router: Router) {}

  ionViewWillEnter() {
    this.cartItems = this.cartService.getCartItems();
  }

  increaseQty(item: any) { item.quantity++; }
  decreaseQty(item: any) { if (item.quantity > 1) item.quantity--; }
  removeItem(item: any) {
    this.cartService.removeFromCart(item);
    this.cartItems = this.cartService.getCartItems();
  }

  getTotal() { return this.cartService.getTotal(); }

  checkout() {
    this.router.navigate(['/checkout'], {
      state: {
        cartItems: this.cartItems,
        totalPrice: this.getTotal()
      }
    });
  }
}
