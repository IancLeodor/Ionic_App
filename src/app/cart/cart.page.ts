import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { OrderService } from '../services/order.service';
import { formatDate } from '@angular/common';
import { RecipeService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartItems: any[];

  constructor(
    private cartService: RecipeService,
    private navCtrl: NavController,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.cartService.getRecipes().subscribe((items) => {
      this.cartItems = items;
    });
  }

  async viewDetails(cocktailId: string) {
    this.navCtrl.navigateForward(['/cocktail-details'], { queryParams: { special: JSON.stringify(cocktailId) } });
  }

  orderItem(item: any) {
    const orderTime = new Date();
    const deliveryTime = new Date(orderTime.getTime() + 20 * 60000); 

    item.orderTime = formatDate(orderTime, 'shortTime', 'en-US');
    item.deliveryTime = formatDate(deliveryTime, 'shortTime', 'en-US');
    item.ordered = true;

    // Adaugă comanda la serviciul de comenzi
    this.orderService.addOrder({
      idDrink: item.idDrink,
      strDrink: item.strDrink,
      orderTime: item.orderTime,
      deliveryTime: item.deliveryTime
    }).subscribe(() => {
      // Actualizează elementul din cartItems pentru a afișa timpul de comandă și livrare
      this.cartItems = this.cartItems.map(cartItem => {
        if (cartItem.idDrink === item.idDrink) {
          return { ...cartItem, orderTime: item.orderTime, deliveryTime: item.deliveryTime, ordered: true };
        }
        return cartItem;
      });
    });
  }

  cancelOrder(item: any) {
    item.ordered = false;
    item.orderTime = null;
    item.deliveryTime = null;

    // Elimină comanda din serviciul de comenzi
    this.orderService.removeOrder(item.idDrink).subscribe(() => {
      // Actualizează elementul din cartItems pentru a elimina timpul de comandă și livrare
      this.cartItems = this.cartItems.map(cartItem => {
        if (cartItem.idDrink === item.idDrink) {
          return { ...cartItem, orderTime: null, deliveryTime: null, ordered: false };
        }
        return cartItem;
      });
    });
  }
}
