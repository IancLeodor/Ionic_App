import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  showNavBar = true;
  subscription: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavBar = !event.url.includes('login') && !event.url.includes('signup');
      }
    });

    // Verificăm ruta curentă la inițializare
    const currentUrl = this.router.url;
    this.showNavBar = !currentUrl.includes('login') && !currentUrl.includes('signup');
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }
}
