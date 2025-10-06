import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [IonicModule, CommonModule],
  template: `
    <ion-header>
      <ion-toolbar color="dark">
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs"></ion-back-button>
        </ion-buttons>
        <ion-title>My Wishlist</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="dark" class="ion-padding">
      <ion-list *ngIf="wishlist.length > 0">
        <ion-item *ngFor="let item of wishlist; let i = index" lines="full">
          <ion-icon name="heart-outline" slot="start" color="danger"></ion-icon>
          <ion-label>
            <h2>{{ item.name }}</h2>
            <p>₱{{ item.price }}</p>
          </ion-label>
          <ion-button fill="clear" color="light" (click)="remove(i)">
            <ion-icon name="trash-outline"></ion-icon>
          </ion-button>
        </ion-item>
      </ion-list>

      <div *ngIf="wishlist.length === 0" class="empty-state">
        <ion-icon name="heart-dislike-outline"></ion-icon>
        <p>Your wishlist is empty</p>
      </div>
    </ion-content>
  `,
  styles: [`
    ion-content { --background: #121212; color: #fff; }
    ion-item { --background: #1e1e1e; border-radius: 8px; margin-bottom: 6px; }
    h2 { margin: 0; font-size: 16px; font-weight: 600; color: #fff; }
    p { margin: 0; font-size: 13px; color: #aaa; }
    .empty-state { display: flex; flex-direction: column; align-items: center; margin-top: 50px; color: #777; }
    .empty-state ion-icon { font-size: 50px; margin-bottom: 12px; color: #3ac569; }
  `]
})
export class WishlistPage {
  wishlist: any[] = [];

  constructor(private router: Router, private userService: UserService) {}

  ionViewWillEnter() {
    this.wishlist = this.userService.getWishlist();
  }

  remove(index: number) {
    this.userService.removeFromWishlist(index);
    this.wishlist = this.userService.getWishlist();
  }
}
