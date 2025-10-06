import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab3',
  standalone: true,
  imports: [IonicModule, CommonModule],
  template: `
    <ion-header>
      <ion-toolbar color="dark">
        <ion-title>My Profile</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="dark" class="ion-padding">
      <!-- Profile Info -->
      <div class="profile-header">
        <img class="avatar" src="assets/monkey-d-luffy-neon-3840x2160-20277.jpg" />
        <h2>{{ user.name }}</h2>
        <p>{{ user.email }}</p>
      </div>

      <!-- Quick Stats -->
      <ion-grid class="stats-grid">
        <ion-row>
          <ion-col>
            <ion-card class="stat-card" button (click)="goToOrders()">
              <div class="stat-content">
                <ion-icon name="cube-outline" class="stat-icon"></ion-icon>
                <div class="stat-text">
                  <div class="stat-number">{{ user.orders }}</div>
                  <div class="stat-label">Orders</div>
                </div>
              </div>
            </ion-card>
          </ion-col>

          <ion-col>
            <ion-card class="stat-card" button (click)="goToWishlist()">
              <div class="stat-content">
                <ion-icon name="heart-outline" class="stat-icon"></ion-icon>
                <div class="stat-text">
                  <div class="stat-number">{{ user.wishlist }}</div>
                  <div class="stat-label">Wishlist</div>
                </div>
              </div>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>

      <!-- Account Options -->
      <ion-list class="profile-options">
        <ion-item button>
          <ion-icon name="person-outline" slot="start" color="success"></ion-icon>
          <ion-label>Edit Profile</ion-label>
        </ion-item>
        <ion-item button>
          <ion-icon name="lock-closed-outline" slot="start" color="success"></ion-icon>
          <ion-label>Change Password</ion-label>
        </ion-item>
        <ion-item button>
          <ion-icon name="notifications-outline" slot="start" color="success"></ion-icon>
          <ion-label>Notifications</ion-label>
        </ion-item>
        <ion-item button>
          <ion-icon name="settings-outline" slot="start" color="success"></ion-icon>
          <ion-label>Settings</ion-label>
        </ion-item>
      </ion-list>

      <!-- Logout Button -->
      <div class="logout-container">
        <ion-button expand="block" color="danger" (click)="logout()">
          <ion-icon name="log-out-outline" slot="start"></ion-icon>
          Logout
        </ion-button>
      </div>
    </ion-content>
  `,
  styles: [`
    ion-content {
      --background: #121212;
      color: #fff;
    }

    .profile-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      margin: 20px 0;
    }

    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
      display: block;
      margin: 0 auto 12px;
      border: 3px solid #3ac569;
      box-shadow: 0 0 8px rgba(58,197,105,0.6);
    }

    .profile-header h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
      color: #fff;
    }

    .profile-header p {
      margin: 4px 0 0;
      color: #ccc;
      font-size: 14px;
    }

    .stats-grid {
      margin-top: 10px;
    }

    .stat-card {
      background: linear-gradient(145deg, #1f1f1f, #2b2b2b);
      border-radius: 10px;
      box-shadow: 0 6px 18px rgba(0,0,0,0.5);
      padding: 14px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
    }

    .stat-card:active {
      transform: scale(0.97);
    }

    .stat-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
    }

    .stat-icon {
      font-size: 32px;
      color: #3ac569;
    }

    .stat-number {
      font-size: 20px;
      font-weight: 700;
      color: #fff;
    }

    .stat-label {
      font-size: 13px;
      color: #ccc;
    }

    .profile-options ion-item {
      --background: #1e1e1e;
      border-radius: 8px;
      margin: 6px 0;
      color: #fff;
    }

    .logout-container {
      margin-top: 20px;
      padding: 0 12px;
    }

    ion-button[color="danger"] {
      --background: linear-gradient(135deg, #ff6b6b, #d64545);
      border-radius: 12px;
      font-weight: 600;
      font-size: 16px;
    }
  `]
})
export class Tab3Page {
  user: any;

  constructor(private router: Router, private userService: UserService) {
    this.user = this.userService.getUser();
  }

  goToOrders() {
    this.router.navigate(['/orders']);
  }

  goToWishlist() {
    this.router.navigate(['/wishlist']);
  }

  logout() {
    console.log("User logged out");
    localStorage.clear(); // Optional: clear user data
    this.router.navigate(['/signin']);
  }
}
