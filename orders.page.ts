import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [IonicModule, CommonModule],
  template: `
    <ion-header>
      <ion-toolbar color="dark">
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs"></ion-back-button>
        </ion-buttons>
        <ion-title>My Orders</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="dark" class="ion-padding">

      <ion-list *ngIf="orders.length > 0">
        <ion-card *ngFor="let order of orders" class="order-card">
          <ion-card-header>
            <ion-card-title>{{ order.name }}</ion-card-title>
            <ion-card-subtitle>{{ order.date }} • ₱{{ order.total }}</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>
            <ion-item *ngFor="let item of order.items" lines="none" class="order-item">
              <img [src]="item.image" class="item-thumb" />
              <ion-label>
                <h2>{{ item.name }}</h2>
                <p>{{ item.quantity }} × ₱{{ item.price }}</p>
                <p class="subtotal">Subtotal: ₱{{ item.price * item.quantity }}</p>
              </ion-label>
            </ion-item>
          </ion-card-content>
        </ion-card>
      </ion-list>

      <div *ngIf="orders.length === 0" class="empty-state">
        <ion-icon name="bag-outline"></ion-icon>
        <p>No orders yet</p>
      </div>

    </ion-content>
  `,
  styles: [`
    ion-content { --background: #121212; color: #fff; }

    .order-card {
      background: #1e1e1e;
      border-radius: 12px;
      margin-bottom: 12px;
      padding: 8px;
    }

    ion-card-title {
      font-size: 16px;
      font-weight: 600;
      color: #fff;
    }

    ion-card-subtitle {
      font-size: 13px;
      color: #aaa;
    }

    .order-item {
      --background: #292929;
      border-radius: 8px;
      margin: 6px 0;
      padding: 8px;
      display: flex;
      align-items: center;
    }

    .item-thumb {
      width: 60px;
      height: 60px;
      border-radius: 8px;
      object-fit: cover;
      margin-right: 12px;
    }

    h2 {
      margin: 0;
      font-size: 15px;
      font-weight: 600;
      color: #fff;
    }

    p {
      margin: 0;
      font-size: 13px;
      color: #ccc;
    }

    .subtotal {
      font-weight: 600;
      color: #3ac569;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 50px;
      color: #777;
    }

    .empty-state ion-icon {
      font-size: 50px;
      margin-bottom: 12px;
      color: #3ac569;
    }
  `]
})
export class OrdersPage {
  orders: any[] = [];

  constructor(private userService: UserService) {}

  ionViewWillEnter() {
    this.orders = this.userService.getOrders() || [];
  }
}
