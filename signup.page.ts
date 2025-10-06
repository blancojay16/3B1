import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule]
})
export class SignupPage {
  name = '';
  email = '';
  password = '';

  constructor(private router: Router) {}

  signUp() {
    console.log('Creating account:', this.name, this.email);
    this.router.navigateByUrl('/signin');
  }

  goToSignin() {
    this.router.navigateByUrl('/signin');
  }

  openGuide() {
    console.log('Opening user guide...');
    this.router.navigateByUrl('/guide');
  }

  onMouseMove(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  }
}
