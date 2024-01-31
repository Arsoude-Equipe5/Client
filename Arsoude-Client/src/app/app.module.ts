import { HikeCreationComponent } from './hike-creation/hike-creation.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleMapsModule } from '@angular/google-maps';
import { NavComponent } from './nav/nav.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InputComponent } from './components/input/input.component';
import { SigninComponent } from './pages/signin/signin.component';
import { ToastrModule } from 'ngx-toastr';


const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'MM/YYYY', // this is how your date will be parsed from Input
  },
  display: {
    dateInput: 'MM/YYYY', // this is how your date will get displayed on the Input
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HikeCreationComponent,
    RegisterComponent,
    HomeComponent,
    SigninComponent,
    NavbarComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatNativeDateModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
      
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
  ],
  bootstrap: [AppComponent],
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
export class AppModule {}
