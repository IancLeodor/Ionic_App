import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {
  private baseUrl: string = 'https://www.thecocktaildb.com/api/json/v1/1';
  private apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  constructor(private http: HttpClient) {}

  listCocktailsByFirstLetter(firstLetter: string) {
    return this.http.get(`${this.baseUrl}/search.php?f=${firstLetter}`);
  }

  searchCocktailByName(cocktailName: string) {
    return this.http.get(`${this.baseUrl}/search.php?s=${cocktailName}`);
  }

  searchCocktailByKeyword(keyword: string) {
    return this.http.get(`${this.baseUrl}/search.php?s=${keyword}`);
  }
  getCocktailDetails(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${name}`);
  }
  // Alte metode pentru a obține informații despre cocktail-uri în funcție de nevoile tale
}
