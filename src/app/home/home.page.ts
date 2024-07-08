import { Component, OnInit } from '@angular/core';
import { CocktailService } from '../services/cocktail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  cocktails: any[];
  searchTerm: string = '';

  constructor(private cocktailService: CocktailService, private router: Router) {}

  ngOnInit() {
    this.loadCocktails();
  }

  reloadCocktails() {
    this.loadCocktails();
  }

  searchCocktails() {
    this.loadCocktails();
  }

  loadCocktails() {
    if (this.searchTerm.trim() === '') {
      // Dacă nu există un termen de căutare, afișează toate cocktail-urile care încep cu litera "a"
      this.cocktailService.listCocktailsByFirstLetter('a').subscribe((data: any) => {
        this.cocktails = data.drinks;
      });
    } else {
      // Dacă există un termen de căutare, caută cocktail-urile relevante
      this.cocktailService.searchCocktailByName(this.searchTerm).subscribe((data: any) => {
        this.cocktails = data.drinks;
      });
    }
  }

  goToCocktailDetails(cocktail: any) {
    this.router.navigate(['/cocktail-details'], {
      queryParams: { special: JSON.stringify(cocktail) }
    });
  }
}