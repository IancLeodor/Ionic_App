import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, Observable, of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private localStorageKey = 'recipes';

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {}

  getRecipes(): Observable<any[]> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.list(`recipes/${user.uid}`).valueChanges().pipe(
            tap(recipes => {
              localStorage.setItem(this.localStorageKey, JSON.stringify(recipes));
            }),
            catchError(() => {
              const localData = localStorage.getItem(this.localStorageKey);
              return of(localData ? JSON.parse(localData) : []);
            })
          );
        } else {
          const localData = localStorage.getItem(this.localStorageKey);
          return of(localData ? JSON.parse(localData) : []);
        }
      })
    );
  }

  isInCart(cocktailId: string): Observable<boolean> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.object(`recipes/${user.uid}/${cocktailId}`).valueChanges().pipe(
            map(recipe => !!recipe)
          );
        } else {
          const localData = localStorage.getItem(this.localStorageKey);
          const recipes = localData ? JSON.parse(localData) : [];
          return of(recipes.some((recipe: any) => recipe.idDrink === cocktailId));
        }
      })
    );
  }

  addToCart(cocktail: any): Observable<void> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          const recipesRef = this.db.list(`recipes/${user.uid}`);
          return from(recipesRef.set(cocktail.idDrink, cocktail)).pipe(map(() => void 0));
        } else {
          throw new Error('User not authenticated');
        }
      })
    );
  }

  removeFromCart(cocktailId: string): Observable<void> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          const recipesRef = this.db.list(`recipes/${user.uid}`);
          return from(recipesRef.remove(cocktailId)).pipe(map(() => void 0));
        } else {
          throw new Error('User not authenticated');
        }
      })
    );
  }
}
