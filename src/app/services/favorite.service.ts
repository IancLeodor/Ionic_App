import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {}

  getFavorites(): Observable<any[]> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.list(`favorites/${user.uid}`).valueChanges();
        } else {
          return of([]);
        }
      })
    );
  }

  isFavorite(cocktailId: string): Observable<boolean> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.object(`favorites/${user.uid}/${cocktailId}`).valueChanges().pipe(
            map(favorite => !!favorite)
          );
        } else {
          return of(false);
        }
      })
    );
  }

  addToFavorites(cocktail: any): Observable<void> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          const favoritesRef = this.db.list(`favorites/${user.uid}`);
          return from(favoritesRef.set(cocktail.idDrink, cocktail)).pipe(map(() => void 0));
        } else {
          throw new Error('User not authenticated');
        }
      })
    );
  }

  removeFromFavorites(cocktailId: string): Observable<void> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          const favoritesRef = this.db.list(`favorites/${user.uid}`);
          return from(favoritesRef.remove(cocktailId)).pipe(map(() => void 0));
        } else {
          throw new Error('User not authenticated');
        }
      })
    );
  }
}
