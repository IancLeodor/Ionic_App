import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CocktailDetailsPage } from './cocktail-details.page';

const routes: Routes = [
  {
    path: '',
    component: CocktailDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CocktailDetailsPageRoutingModule {}
