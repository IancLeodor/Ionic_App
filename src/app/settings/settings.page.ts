import { Component, OnInit } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { signOut } from '@angular/fire/auth';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  userId: string = '';
  email: string = '';
  fullName: string = '';
  newEmail: string = '';
  newFullName: string = '';
  darkMode: boolean = false;

  constructor(private auth: Auth, private userService: UserService, private router: Router) { }

  async ngOnInit() {
    const user: User | null = this.auth.currentUser;
    if (user) {
      this.userId = user.uid;
      try {
        console.log('Fetching user data for:', this.userId);
        const userData = await this.userService.getUserData(this.userId);
        if (userData) {
          console.log('User data:', userData);
          this.email = userData.email || '';
          this.fullName = userData.fullName || '';
          this.newEmail = this.email;
          this.newFullName = this.fullName;
        } else {
          console.log('No user data found');
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    } else {
      console.log('No authenticated user found');
    }

    // Check initial theme
    this.checkInitialTheme();
  }

  checkInitialTheme() {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode === 'false') {
      this.darkMode = false;
    } else {
      this.darkMode = true;
    }
    this.toggleDarkMode();
  }

  toggleDarkMode() {
    console.log('Dark mode:', this.darkMode);
    document.body.classList.toggle('dark', this.darkMode);
    localStorage.setItem('darkMode', this.darkMode.toString());
    console.log('Body classes:', document.body.classList);
  }

  async saveSettings() {
    if (this.userId) {
      try {
        console.log('Saving settings for:', this.userId);
        await this.userService.updateUserData(this.userId, {
          email: this.newEmail,
          fullName: this.newFullName
        });
        alert('Settings saved successfully!');
      } catch (error) {
        console.error('Error saving settings:', error);
        alert('Failed to save settings. Please try again.');
      }
    }
  }

  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/login']);
  }
  
}
