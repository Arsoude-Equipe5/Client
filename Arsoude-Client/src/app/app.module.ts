import { HikeCreationComponent } from './hike-creation/hike-creation.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleMapsModule } from '@angular/google-maps';
import { NavComponent } from './nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HikeCreationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule ,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    GoogleMapsModule,
    HttpClientModule,

    provideFirebaseApp(() => initializeApp(
      {"projectId":"arsoudeimages",
      "appId":"1:872033534476:web:40ebd03f0a00218c42a429",
      "storageBucket":"arsoudeimages.appspot.com",
      "apiKey":"AIzaSyAG5qz6MN9xj1io_wrYtMFuqfguJURJUuQ",
      "authDomain":"arsoudeimages.firebaseapp.com",
      "messagingSenderId":"872033534476"}
      )),
    provideStorage(() => getStorage()),
  
   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
