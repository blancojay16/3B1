import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  template: `
    <ion-content [fullscreen]="true" scroll-y="true" class="signin-content">
      <div class="signin-wrapper">
        <div class="signin-card">
          <div class="logo">
            <ion-icon name="cart-outline"></ion-icon>
            <h1>3B<span>Shop</span></h1>
          </div>

          <h2>Sign In</h2>
          <p class="subtitle">Access your account and continue shopping</p>

          <div class="input-group">
            <ion-item class="input-item" lines="none">
              <ion-icon slot="start" name="mail-outline" class="input-icon"></ion-icon>
              <ion-input
                type="email"
                placeholder="Enter your email"
                [(ngModel)]="email"
                class="input-field">
              </ion-input>
            </ion-item>

            <ion-item class="input-item" lines="none">
              <ion-icon slot="start" name="lock-closed-outline" class="input-icon"></ion-icon>
              <ion-input
                type="password"
                placeholder="Enter your password"
                [(ngModel)]="password"
                class="input-field">
              </ion-input>
            </ion-item>
          </div>

          <div class="signin-btn-container">
            <ion-button expand="block" class="signin-btn" (click)="signin()">
              Sign In
            </ion-button>
          </div>

          <div class="user-guide" (click)="openGuide()">
            <ion-icon name="help-circle-outline"></ion-icon>
            <span>User Guide</span>
          </div>

          <div class="footer-text">
            <p>Don't have an account?
              <a (click)="goToSignup()">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </ion-content>
  `,
  styles: [`
    ion-content {
      --background: radial-gradient(circle at top left, #0d0d0d, #000);
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      --padding-top: env(safe-area-inset-top);
      --padding-bottom: env(safe-area-inset-bottom);
      --overflow: auto;
    }

    .signin-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 100%;
      width: 100%;
      padding: 16px;
      box-sizing: border-box;
    }

    .signin-card {
      background: rgba(30, 30, 30, 0.9);
      border-radius: 16px;
      padding: 32px 28px;
      width: 100%;
      max-width: 380px;
      box-shadow: 0 6px 20px rgba(0, 255, 150, 0.15);
    }

    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 18px;
    }

    .logo ion-icon {
      font-size: 32px;
      color: #00ff99;
      margin-right: 8px;
    }

    .logo h1 {
      font-size: 28px;
      font-weight: 700;
      letter-spacing: 1px;
    }

    .logo span {
      color: #00ff99;
    }

    h2 {
      font-size: 22px;
      font-weight: 600;
      margin-bottom: 6px;
      text-align: center;
    }

    .subtitle {
      color: #aaa;
      font-size: 14px;
      text-align: center;
      margin-bottom: 24px;
    }

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .input-item {
      --background: #121212;
      --border-radius: 12px;
      padding: 4px 8px;
      align-items: center;
    }

    .input-icon {
      color: #00ff99;
      font-size: 20px;
      margin-right: 6px;
      align-self: center;
    }

    ion-input {
      color: #fff;
      font-size: 15px;
      letter-spacing: 0.3px;
    }

    ion-input::part(native) {
      caret-color: #00ff99;
    }

    ion-input::placeholder {
      color: #bbb;
      font-style: normal;
      font-size: 14px;
      opacity: 0.9;
      vertical-align: middle;
    }

    .signin-btn-container {
      margin-top: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .signin-btn {
      --background: linear-gradient(90deg, #00ff99, #00c46b);
      --border-radius: 12px;
      font-weight: 600;
      letter-spacing: 0.5px;
      transition: all 0.3s ease;
      width: 100%;
    }

    .user-guide {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 18px;
      color: #00ff99;
      cursor: pointer;
    }

    .user-guide ion-icon {
      font-size: 28px;
      margin-bottom: 4px;
    }

    .user-guide span {
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.3px;
    }

    .footer-text {
      text-align: center;
      margin-top: 16px;
      color: #aaa;
      font-size: 14px;
    }

    .footer-text a {
      color: #00ff99;
      font-weight: 600;
      text-decoration: none;
      cursor: pointer;
    }
  `]
})
export class SigninPage {
  email = '';
  password = '';

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  async signin() {
    if (!this.email || !this.password) {
      const toast = await this.toastCtrl.create({
        message: 'Please enter your email and password.',
        duration: 2000,
        color: 'warning',
        position: 'top',
      });
      await toast.present();
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Signing in...',
      spinner: 'crescent',
    });
    await loading.present();

    setTimeout(async () => {
      await loading.dismiss();

      const toast = await this.toastCtrl.create({
        message: 'Welcome back!',
        duration: 1500,
        color: 'success',
        position: 'top',
      });
      await toast.present();

      this.router.navigateByUrl('/tabs');
    }, 1500);
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }

  openGuide() {
    this.router.navigate(['/guide']);
  }
}
