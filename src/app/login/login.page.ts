import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavBarService } from 'src/app/services/navbar.service';
import {  OnInit, OnDestroy } from '@angular/core';

import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage  implements OnInit, OnDestroy {
  showNavbar: boolean = false;

  name: string = "";
  email: string = "";
  password: string = "";
  private hideCreateButton: boolean = true;

  public hidebutton(): boolean {
      return this.hideCreateButton;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.navBarService.setShowNavBar(true);
  }

  constructor(public navCntrl: NavController, private auth: Auth,private navBarService: NavBarService) {}
  // ngOnInit() {
  //   this.navBarService.setVisible(false);
  // }

  
  async login() {
    try {
      const user = await signInWithEmailAndPassword(
        this.auth,
        this.email,
        this.password
      );
      console.log(user);
      // Redirecționează utilizatorul la pagina 'home' după autentificare
      this.navCntrl.navigateForward('/home');
    } catch (error) {
      console.error('Error during login', error);
      // Afișează un mesaj de eroare utilizatorului, dacă este cazul
    }
  }

  gotoSignup() {
    this.navCntrl.navigateForward('/signup');
  }
}