import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Database, ref, get, set, update } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth: Auth, private db: Database) { }

  async updateUserData(userId: string, data: any) {
    const userRef = ref(this.db, `users/${userId}`);
    try {
      await update(userRef, data);
      console.log('User data updated successfully');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  }

  async setUserData(uid: string, data: any) {
    const userRef = ref(this.db, `users/${uid}`);
    try {
      await set(userRef, data);
      console.log('User data set successfully');
    } catch (error) {
      console.error('Error setting user data:', error);
    }
  }

  async getUserData(uid: string) {
    const userRef = ref(this.db, `users/${uid}`);
    try {
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        console.log('User data retrieved successfully:', snapshot.val());
        return snapshot.val();
      } else {
        console.log('No user data found');
        return null;
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
      return null;
    }
  }
}
