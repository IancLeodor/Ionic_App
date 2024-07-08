import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Adaugă acest import
// import { TabBarComponent } from './components/tab-bar/tab-bar.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { NavbarComponent } from './components/navbar/navbar.component';



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3D7XRWHSK2D4GnATz7ixSpGU8DA1LC8A",
  authDomain: "gusto-heaven-ionic.firebaseapp.com",
  projectId: "gusto-heaven-ionic",
  databaseURL:"https://gusto-heaven-ionic-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "gusto-heaven-ionic.appspot.com",
  messagingSenderId: "271624757902",
  appId: "1:271624757902:web:c1d854566679d2c215dfdf",
  measurementId: "G-56XCNFKGVM"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideDatabase(() => getDatabase())

  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
