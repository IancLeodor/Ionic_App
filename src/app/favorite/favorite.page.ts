import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {
  favorites: any[];

  constructor(private favoriteService: FavoriteService, private navCtrl: NavController) {}

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.favoriteService.getFavorites().subscribe((favorites) => {
      this.favorites = favorites;
    });
  }

  async removeFavorite(favoriteId: string) {
    this.favoriteService.removeFromFavorites(favoriteId).subscribe(() => {
      this.loadFavorites();
    });
  }

  viewDetails(favoriteId: string) {
    this.navCtrl.navigateForward('/cocktail-details', { queryParams: { id: favoriteId } });
  }
}
