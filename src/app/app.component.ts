import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoginPage: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects || event.url;
        if (url === '/login') {
          this.isLoginPage = true;
          this.reloadLoginPage();
        } else {
          this.isLoginPage = false;
        }
      }
    });
  }

  ngOnInit() {
    this.checkInitialTheme();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        const body = document.body;

        if (url.includes('login') || url.includes('signup')) {
          body.classList.add('hide-tab-bar');
        } else {
          body.classList.remove('hide-tab-bar');
        }
        if (url === '/home') {
          this.handleHomePageRefresh();
        }
      }
    });
  }

  private reloadLoginPage() {
    if (!sessionStorage.getItem('loginRefreshed')) {
      sessionStorage.setItem('loginRefreshed', 'true');
      window.location.reload();
    }
  }
  private handleHomePageRefresh() {
    if (!localStorage.getItem('homePageRefreshed')) {
      localStorage.setItem('homePageRefreshed', 'true');
      window.location.reload();
    }
  }
    private applyDarkMode() {
    document.body.classList.add('dark');
  }
  private checkInitialTheme() {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode === 'false') {
      document.body.classList.remove('dark');
    } else {
      document.body.classList.add('dark');
    localStorage.setItem('darkMode', 'true');
    }
  }
}


// import { Component, OnInit } from '@angular/core';
// import { Router, NavigationEnd } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   templateUrl: 'app.component.html',
//   styleUrls: ['app.component.scss'],
// })
// export class AppComponent implements OnInit {
//   constructor(private router: Router) {
//     this.router.events.subscribe((event: any) => {
//       if (event.url === '/login') {
//         this.isLoginPage = true;
//       } else {
//         this.isLoginPage = false;
//       }
//     });
//   }
//   isLoginPage: boolean = false;

//   ngOnInit() {
//     this.router.events.subscribe(event => {
//       if (event instanceof NavigationEnd) {
//         const url = event.urlAfterRedirects;
//         const body = document.body;
        
//         if (url.includes('login') || url.includes('signup')) {
//           body.classList.add('hide-tab-bar');
//         } else {
//           body.classList.remove('hide-tab-bar');
//         }
//       }
//     });
//   }
// }
