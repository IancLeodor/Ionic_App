import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkModeKey = 'dark-mode';

  constructor() {
    const darkMode = localStorage.getItem(this.darkModeKey);
    if (darkMode === 'true') {
      this.enableDarkMode();
    } else {
      this.disableDarkMode();
    }
  }

  enableDarkMode() {
    document.body.classList.add('dark');
    localStorage.setItem(this.darkModeKey, 'true');
  }

  disableDarkMode() {
    document.body.classList.remove('dark');
    localStorage.setItem(this.darkModeKey, 'false');
  }

  isDarkModeEnabled(): boolean {
    return document.body.classList.contains('dark');
  }
}
