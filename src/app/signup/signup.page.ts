import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';
import { __importDefault } from 'tslib';
interface User {
  name: string;
  email: string;
  password: string;
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  name: string = "";
  email: string = "";
  password: string = "";

  constructor(private router: Router, public navCtrl: NavController, private auth: Auth, private userService: UserService, private alertController: AlertController) {}

  async signup() {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      const user = userCredential.user;
      await this.userService.setUserData(user.uid, { fullName: this.name, email: this.email });
      console.log(user);
      this.router.navigate(['/home']);
    } catch (error) {
      console.error(error);
      const alert = await this.alertController.create({
        header: 'Signup Error',
        message: error.message,
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  gotoLogin() {
    this.navCtrl.navigateForward('login');
  }
  ngOnInit() {
    // Logica de inițializare aici, dacă este necesar
  }
}



