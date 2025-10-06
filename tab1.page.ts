import { Component, ViewChild } from '@angular/core';
import { IonicModule, IonContent, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router'; // ✅ Added import

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class Tab1Page {
  @ViewChild(IonContent) content!: IonContent;

  constructor(
    private cartService: CartService,
    private toastController: ToastController,
    private router: Router // ✅ Added Router for navigation
  ) {}

  categories = [
    { name: 'Electronics', icon: 'phone-portrait' },
    { name: 'Fashion', icon: 'shirt' },
    { name: 'Home & Kitchen', icon: 'home' },
    { name: 'Beauty', icon: 'color-palette' },
    { name: 'Sports', icon: 'football' },
    { name: 'Books', icon: 'book' },
  ];

  featured = [
    { name: 'Smart Watch', discount: '-20%', img: 'assets/istockphoto-486993228-612x612 (1).jpg', category: 'Electronics', rating: 4.5, reviews: 112, price: 2499, outOfStock: false },
    { name: 'Strap', discount: '-20%', img: 'assets/360_F_1546611011_KJ5mQQluLAkRAVl6vCaifNCouGpUR4XV.jpg', category: 'Accessories', rating: 4.2, reviews: 87, price: 499, outOfStock: false },
    { name: 'Backpack', discount: '-31%', img: 'assets/51o955w5tKL._UY1000_.jpg', category: 'Fashion', rating: 4.8, reviews: 203, price: 1299, outOfStock: true },
    { name: 'Nike Shoe', discount: '-31%', img: 'assets/360_F_391456310_iYbpTyVcCgjhbcnCBn3Nb2veidPKyEfX.jpg', category: 'Fashion', rating: 4.8, reviews: 203, price: 1299, outOfStock: true },

 
    { name: 'Wireless Earbuds', discount: '-25%', img: 'assets/Electronics/download (2).jpg', category: 'Electronics', rating: 4.6, reviews: 190, price: 1599, outOfStock: false },
    { name: 'Gaming Mouse', discount: '-15%', img: 'assets/Electronics/Boost your gaming potential with the Logitech G502….jpg', category: 'Electronics', rating: 4.7, reviews: 150, price: 899, outOfStock: false },
    { name: 'Leather Wallet', discount: '-20%', img: 'assets/Fashion/LOV2 Bags - Bagle Glam Hub 1492 Most of the Bags….jpg', category: 'Fashion', rating: 4.4, reviews: 88, price: 699, outOfStock: false },
    { name: 'Sunglasses', discount: '-10%', img: 'assets/Fashion/53d4959f-0493-496e-8f5f-2698ea5a507a.jpg', category: 'Fashion', rating: 4.5, reviews: 132, price: 499, outOfStock: false },
    { name: 'Portable Speaker', discount: '-30%', img: 'assets/Electronics/67 Vanlife Geschenke für jedes Budget (2025).jpg', category: 'Electronics', rating: 4.8, reviews: 260, price: 1899, outOfStock: true },
  ];

  scrollToBottom() {
    this.content.scrollToBottom(300);
  }

  scrollToTop() {
    this.content.scrollToTop(300);
  }

  getStars(rating: number): string[] {
    const stars: string[] = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) stars.push('star');
      else if (i - rating < 1) stars.push('star-half');
      else stars.push('star-outline');
    }
    return stars;
  }

  // ✅ Add to cart with toast
  async addToCart(item: any) {
    this.cartService.addToCart(item);

    const toast = await this.toastController.create({
      message: `🛒 ${item.name} added to cart!`,
      duration: 2000,
      position: 'bottom',
      cssClass: 'custom-toast',
      mode: 'ios',
    });

    await toast.present();
  }

  // ✅ Added: navigate to category page when a category is clicked
  openCategory(category: any) {
    this.router.navigate(['/category', category.name]);
  }
}
