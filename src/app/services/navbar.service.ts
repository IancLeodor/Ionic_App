import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {

  private showNavBarSubject = new BehaviorSubject<boolean>(true);
  showNavBar$: Observable<boolean> = this.showNavBarSubject.asObservable();

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) { // Use NavigationEnd here
        const show = !event.url.includes('login') && !event.url.includes('signup');
        this.setShowNavBar(show);
      }
    });
  }

  setShowNavBar(show: boolean) {
    this.showNavBarSubject.next(show);
  }
}
