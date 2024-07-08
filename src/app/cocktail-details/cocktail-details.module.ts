import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CocktailDetailsPageRoutingModule } from './cocktail-details-routing.module';

import { CocktailDetailsPage } from './cocktail-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CocktailDetailsPageRoutingModule
  ],
  declarations: [CocktailDetailsPage]
})
export class CocktailDetailsPageModule {}
