import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CocktailDetailsPage } from './cocktail-details/cocktail-details.page';
import { CartPage } from './cart/cart.page';
import { FavoritePage } from './favorite/favorite.page';
import { AuthGuard } from './auth-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },

  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'cocktail-details',
    loadChildren: () => import('./cocktail-details/cocktail-details.module').then( m => m.CocktailDetailsPageModule),
    canActivate: [AuthGuard]

  },
  { path: 'cocktail-details', component: CocktailDetailsPage },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'favorites',
    component: FavoritePage
  },

  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule),
    canActivate: [AuthGuard]

  },
  {
    path: 'favorite', 
    loadChildren: () => import('./favorite/favorite.module').then( m => m.FavoritePageModule),
    canActivate: [AuthGuard]

  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
