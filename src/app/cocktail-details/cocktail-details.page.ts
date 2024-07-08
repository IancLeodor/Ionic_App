import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FavoriteService } from '../services/favorite.service';
import { RecipeService } from '../services/cart.service';

@Component({
  selector: 'app-cocktail-details',
  templateUrl: './cocktail-details.page.html',
  styleUrls: ['./cocktail-details.page.scss'],
})
export class CocktailDetailsPage implements OnInit {
  cocktail: any;
  isInCart: boolean = false;
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private toastController: ToastController,
    private cartService: RecipeService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.cocktail = JSON.parse(params.special);

        this.cartService.isInCart(this.cocktail.idDrink).subscribe(isInCart => {
          this.isInCart = isInCart;
        });

        this.favoriteService.isFavorite(this.cocktail.idDrink).subscribe(isFavorite => {
          this.isFavorite = isFavorite;
        });
      }
    });
  }

  getIngredients(): string[] {
    return Object.keys(this.cocktail)
      .filter(key => key.startsWith('strIngredient') && this.cocktail[key])
      .map(key => this.cocktail[key]);
  }

  async toggleCartItem() {
    if (this.isInCart) {
      await this.cartService.removeFromCart(this.cocktail.idDrink).toPromise();
      this.showToast('Cocktail eliminat din coșul de cumpărături');
    } else {
      await this.cartService.addToCart(this.cocktail).toPromise();
      this.showToast('Cocktail adăugat în coșul de cumpărături');
    }
    this.isInCart = !this.isInCart;
  }

  async toggleFavorite() {
    if (this.isFavorite) {
      await this.favoriteService.removeFromFavorites(this.cocktail.idDrink).toPromise();
      this.showToast('Cocktail eliminat din favorite');
    } else {
      await this.favoriteService.addToFavorites(this.cocktail).toPromise();
      this.showToast('Cocktail adăugat la favorite');
    }
    this.isFavorite = !this.isFavorite;
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
