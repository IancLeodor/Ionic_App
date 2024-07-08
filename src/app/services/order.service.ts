import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {}

  getOrders(): Observable<any[]> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.list(`orders/${user.uid}`).valueChanges();
        } else {
          return of([]);
        }
      })
    );
  }

  addOrder(order: any): Observable<void> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          const ordersRef = this.db.list(`orders/${user.uid}`);
          return from(ordersRef.push(order)).pipe(map(() => void 0));
        } else {
          throw new Error('User not authenticated');
        }
      })
    );
  }

  removeOrder(orderId: string): Observable<void> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          const ordersRef = this.db.list(`orders/${user.uid}`);
          return from(ordersRef.remove(orderId)).pipe(map(() => void 0));
        } else {
          throw new Error('User not authenticated');
        }
      })
    );
  }
}
