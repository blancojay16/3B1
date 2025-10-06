import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class CategoryPage {
  categoryName = '';
  products: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.categoryName = this.route.snapshot.paramMap.get('name') || '';
const allProducts = [
  // ✅ Electronics
  { name: 'Smart Watch', category: 'Electronics', price: 2499, discount: '-20%', rating: 4.5, reviews: 120, img: 'assets/istockphoto-486993228-612x612 (1).jpg', outOfStock: false },
  { name: 'Wireless Earbuds', category: 'Electronics', price: 1599, discount: '-15%', rating: 4.3, reviews: 85, img: 'assets/Electronics/download (2).jpg', outOfStock: false },
  { name: 'Bluetooth Speaker', category: 'Electronics', price: 1899, discount: '-18%', rating: 4.4, reviews: 98, img: 'assets/Electronics/67 Vanlife Geschenke für jedes Budget (2025).jpg', outOfStock: false },
  { name: 'Gaming Mouse', category: 'Electronics', price: 899, discount: '-10%', rating: 4.6, reviews: 142, img: 'assets/Electronics/Boost your gaming potential with the Logitech G502….jpg', outOfStock: false },
  { name: 'Mechanical Keyboard', category: 'Electronics', price: 2199, discount: '-12%', rating: 4.7, reviews: 166, img: 'assets/Electronics/Redragon Kumara K552-RGB LED Backlit USB….jpg', outOfStock: false },
  { name: 'Laptop Stand', category: 'Electronics', price: 699, discount: '-8%', rating: 4.5, reviews: 76, img: 'assets/Electronics/uporte para Notebook Tablet Articulado_ _ - Possui….jpg', outOfStock: false },
  { name: 'Portable Charger', category: 'Electronics', price: 999, discount: '-15%', rating: 4.4, reviews: 105, img: 'assets/Electronics/d69ad39e-2beb-471d-91c1-5783102edada.jpg', outOfStock: false },
  { name: 'Wireless Mouse', category: 'Electronics', price: 499, discount: '-20%', rating: 4.3, reviews: 210, img: 'assets/Electronics/Dscription__VIVE COMB Wireless Bluetooth Mouse for….jpg', outOfStock: false },
  { name: 'HD Webcam', category: 'Electronics', price: 1299, discount: '-17%', rating: 4.5, reviews: 133, img: 'assets/Electronics/A câmera de alta definição oferece imagens em….jpg', outOfStock: false },
  { name: 'LED Monitor', category: 'Electronics', price: 5499, discount: '-25%', rating: 4.8, reviews: 301, img: 'assets/Electronics/LG 32MP58HQ-P 32-Inch IPS Monitor with Screen….jpg', outOfStock: false },

  // ✅ Fashion
  { name: 'Backpack', category: 'Fashion', price: 1299, discount: '-31%', rating: 4.8, reviews: 203, img: 'assets/51o955w5tKL._UY1000_.jpg', outOfStock: false },
  { name: 'Nike Shoe', category: 'Fashion', price: 1999, discount: '-25%', rating: 4.6, reviews: 152, img: 'assets/360_F_391456310_iYbpTyVcCgjhbcnCBn3Nb2veidPKyEfX.jpg', outOfStock: false },
  { name: 'Denim Jacket', category: 'Fashion', price: 1599, discount: '-20%', rating: 4.7, reviews: 180, img: 'assets/Fashion/Classic Denim jacket.jpg', outOfStock: false },
  { name: 'Graphic T-Shirt', category: 'Fashion', price: 699, discount: '-15%', rating: 4.4, reviews: 89, img: 'assets/Fashion/Men Cotton Planet & Slogan Graphic Tee Black….jpg', outOfStock: false },
  { name: 'Leather Belt', category: 'Fashion', price: 499, discount: '-10%', rating: 4.3, reviews: 77, img: 'assets/Fashion/d2763d74-f2f2-4770-9c06-b0b2ea6570cf.jpg', outOfStock: false },
  { name: 'Sunglasses', category: 'Fashion', price: 899, discount: '-18%', rating: 4.5, reviews: 130, img: 'assets/Fashion/53d4959f-0493-496e-8f5f-2698ea5a507a.jpg', outOfStock: false },
  { name: 'Wristwatch', category: 'Fashion', price: 1699, discount: '-22%', rating: 4.6, reviews: 198, img: 'assets/Fashion/in stock.jpg', outOfStock: false },
  { name: 'Formal Shoes', category: 'Fashion', price: 2499, discount: '-27%', rating: 4.7, reviews: 165, img: 'assets/Fashion/- Toe cap and turned stitching on the vamp for a….jpg', outOfStock: false },
  { name: 'Cap', category: 'Fashion', price: 399, discount: '-12%', rating: 4.2, reviews: 64, img: 'assets/Fashion/Accessoires textile Homme Casquettes Tommy….jpg', outOfStock: false },
  { name: 'Hoodie', category: 'Fashion', price: 1299, discount: '-19%', rating: 4.6, reviews: 212, img: 'assets/Fashion/qwer.jpg', outOfStock: false },

  // ✅ Books
  { name: 'Atomic Habits', category: 'Books', price: 599, discount: '-10%', rating: 4.9, reviews: 540, img: 'assets/books/8b28a98e-1fc7-4cf1-af3d-82a5230aace4.jpg', outOfStock: false },
  { name: 'The 48 Laws of Power', category: 'Books', price: 799, discount: '-15%', rating: 4.7, reviews: 420, img: 'assets/books/da478514-0083-4b4b-b093-233506a52d47.jpg', outOfStock: false },
  { name: 'Rich Dad Poor Dad', category: 'Books', price: 499, discount: '-12%', rating: 4.8, reviews: 612, img: 'assets/books/52dee6db-bf98-4b5d-8f7f-cd6c89861769.jpg', outOfStock: false },
  { name: 'The Subtle Art of Not Giving a F*ck', category: 'Books', price: 699, discount: '-10%', rating: 4.6, reviews: 300, img: 'assets/books/198eda89-c111-437c-a734-ba1a492c0309.jpg', outOfStock: false },
  { name: 'Deep Work', category: 'Books', price: 799, discount: '-20%', rating: 4.8, reviews: 278, img: 'assets/books/check out my new article_ Thank you.jpg', outOfStock: false },
  { name: 'Think and Grow Rich', category: 'Books', price: 499, discount: '-15%', rating: 4.7, reviews: 410, img: 'assets/books/Book Think and grow rich.jpg', outOfStock: false },
  { name: 'Can’t Hurt Me', category: 'Books', price: 899, discount: '-18%', rating: 4.9, reviews: 512, img: 'assets/books/ef0aac8d-71f1-4993-84b8-a8e5090b6fa4.jpg', outOfStock: false },
  { name: 'Ikigai', category: 'Books', price: 599, discount: '-10%', rating: 4.7, reviews: 340, img: 'assets/books/Ikigai_ The Japanese Secret to a Long and Happy….jpg', outOfStock: false },
  { name: 'Start with Why', category: 'Books', price: 799, discount: '-15%', rating: 4.6, reviews: 200, img: 'assets/books/e63ed2ec-e1e1-4bc1-a304-06c1996769f8.jpg', outOfStock: false },
  { name: 'The Psychology of Money', category: 'Books', price: 899, discount: '-12%', rating: 4.8, reviews: 380, img: 'src/assets/books/Book_ “Psychology of Money” by Morgan Housel💸.jpg', outOfStock: false },

  // ✅ Beauty
  { name: 'Lipstick Set', category: 'Beauty', price: 399, discount: '-20%', rating: 4.2, reviews: 112, img: 'assets/beauty/I love this set_ The colors are so amazing and the….jpg', outOfStock: false },
  { name: 'Perfume', category: 'Beauty', price: 899, discount: '-18%', rating: 4.6, reviews: 230, img: 'assets/beauty/4a899c19-a100-4c50-9042-11c07b2ae83c.jpg', outOfStock: false },
  { name: 'Foundation Cream', category: 'Beauty', price: 599, discount: '-15%', rating: 4.5, reviews: 140, img: 'assets/beauty/ELF Cosmetics Camo CC Cream Foundation- Fair 120N….jpg', outOfStock: false },
  { name: 'Makeup Brush Set', category: 'Beauty', price: 799, discount: '-10%', rating: 4.7, reviews: 160, img: 'assets/beauty/FLAWLESS LOOK Makeup Brush Set.jpg', outOfStock: false },
  { name: 'Hair Serum', category: 'Beauty', price: 499, discount: '-12%', rating: 4.3, reviews: 120, img: 'assets/beauty/As per international shipping regulations, customs….jpg', outOfStock: false },
  { name: 'Face Mask Pack', category: 'Beauty', price: 299, discount: '-8%', rating: 4.4, reviews: 75, img: 'assets/beauty/c92200f0-905d-46c6-a659-2bbf692a91d0.jpg', outOfStock: false },
  { name: 'Nail Polish Kit', category: 'Beauty', price: 399, discount: '-10%', rating: 4.5, reviews: 98, img: 'assets/beauty/Nail Polish Set Gift_ There are any references….jpg', outOfStock: false },
  { name: 'Moisturizer', category: 'Beauty', price: 599, discount: '-18%', rating: 4.6, reviews: 110, img: 'assets/beauty/set of 2 Product Identifiers Brand Neutrogena MPN….jpg', outOfStock: false },
  { name: 'Hair Dryer', category: 'Beauty', price: 1199, discount: '-20%', rating: 4.7, reviews: 210, img: 'assets/beauty/25fdcdb1-98e5-480d-a8cc-d4e619cb4f18.jpg', outOfStock: false },
  { name: 'Eyeliner Pen', category: 'Beauty', price: 299, discount: '-12%', rating: 4.4, reviews: 90, img: 'assets/beauty/O TWO O Liquid Eyeliner, Cat Eyes Stamp Eyeliner….jpg', outOfStock: false },

    // ✅ Sports
  { name: 'Football', category: 'Sports', price: 799, discount: '-10%', rating: 4.5, reviews: 150, img: 'assets/sports/c77caa94-1751-4840-970c-516b7e399d1a.jpg', outOfStock: false },
  { name: 'Basketball', category: 'Sports', price: 899, discount: '-12%', rating: 4.7, reviews: 220, img: 'assets/sports/17ad7cc3-62c3-4f0b-909f-63a536ca1e56.jpg', outOfStock: false },
  { name: 'Yoga Mat', category: 'Sports', price: 499, discount: '-15%', rating: 4.4, reviews: 130, img: 'assets/sports/d9e7c5dd-ec04-4bf5-9b3d-3078e92a53b5.jpg', outOfStock: false },
  { name: 'Dumbbell Set', category: 'Sports', price: 1499, discount: '-20%', rating: 4.8, reviews: 180, img: 'assets/sports/Nike Dumbbells & Dumbbell Sets – Nike Strength.jpg', outOfStock: false },
  { name: 'Tennis Racket', category: 'Sports', price: 1299, discount: '-18%', rating: 4.6, reviews: 95, img: 'assets/sports/Share a piece of beautiful and creative art_.jpg', outOfStock: false },
  { name: 'Running Shoes', category: 'Sports', price: 1999, discount: '-22%', rating: 4.7, reviews: 245, img: 'assets/sports/Wmns Nike Air Zoom Winflo 7 Running Shoes….jpg', outOfStock: false },
  { name: 'Cycling Helmet', category: 'Sports', price: 999, discount: '-15%', rating: 4.5, reviews: 110, img: 'assets/sports/The Best Bluetooth Bike Helmet - Sena R2 Road….jpg', outOfStock: false },
  { name: 'Jump Rope', category: 'Sports', price: 299, discount: '-8%', rating: 4.3, reviews: 80, img: 'assets/sports/Sports Research, Performance Jump Rope, Black, 1….jpg', outOfStock: false },
  { name: 'Water Bottle', category: 'Sports', price: 249, discount: '-5%', rating: 4.2, reviews: 70, img: 'assets/sports/Black Nike Water Bottle.jpg', outOfStock: false },
  { name: 'Gym Bag', category: 'Sports', price: 799, discount: '-10%', rating: 4.5, reviews: 160, img: 'assets/sports/Nike Brasilia 6 Duffel Bag.jpg', outOfStock: false },

  // ✅ Home & Kitchen
  { name: 'Blender', category: 'Home & Kitchen', price: 1499, discount: '-15%', rating: 4.6, reviews: 120, img: 'assets/home and kitchen/Find genuine KitchenAid KSB1575MY0 blender parts….jpg', outOfStock: false },
  { name: 'Electric Kettle', category: 'Home & Kitchen', price: 899, discount: '-10%', rating: 4.5, reviews: 180, img: 'assets/home and kitchen/c2425927-05c4-4d24-b068-b95a0583db80.jpg', outOfStock: false },
  { name: 'Air Fryer', category: 'Home & Kitchen', price: 2499, discount: '-18%', rating: 4.7, reviews: 200, img: 'assets/home and kitchen/Discover a smarter way to cook with the Healthy….jpg', outOfStock: false },
  { name: 'Rice Cooker', category: 'Home & Kitchen', price: 1199, discount: '-12%', rating: 4.6, reviews: 150, img: 'assets/home and kitchen/d8eb7e90-ad74-4dbf-b088-da57ab0c0184.jpg', outOfStock: false },
  { name: 'Microwave Oven', category: 'Home & Kitchen', price: 3999, discount: '-25%', rating: 4.8, reviews: 210, img: 'assets/home and kitchen/13016cbe-9d79-4ebf-9b1d-ef2689d842a7.jpg', outOfStock: false },
  { name: 'Toaster', category: 'Home & Kitchen', price: 799, discount: '-10%', rating: 4.4, reviews: 95, img: 'assets/home and kitchen/77c1d462-5f54-4030-8453-ca21f5eff387.jpg', outOfStock: false },
  { name: 'Cookware Set', category: 'Home & Kitchen', price: 2999, discount: '-20%', rating: 4.7, reviews: 170, img: 'assets/home and kitchen/a8cb8c44-3b7b-411c-819c-e8da1088cd80.jpg', outOfStock: false },
  { name: 'Dish Rack', category: 'Home & Kitchen', price: 499, discount: '-8%', rating: 4.3, reviews: 80, img: 'assets/home and kitchen/4eb620bc-3b1c-4032-94f0-6bab01074a68.jpg', outOfStock: false },
  { name: 'Vacuum Cleaner', category: 'Home & Kitchen', price: 3599, discount: '-22%', rating: 4.8, reviews: 240, img: 'assets/home and kitchen/Everyone may have a different interpretation of….jpg', outOfStock: false },
  { name: 'Electric Fan', category: 'Home & Kitchen', price: 1299, discount: '-12%', rating: 4.5, reviews: 130, img: 'assets/home and kitchen/Midea FS40-19PRD 2 in 1 Function Stand Fan_Table….jpg', outOfStock: false },

];


    this.products = allProducts.filter(
      p => p.category.toLowerCase() === this.categoryName.toLowerCase()
    );
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
}
