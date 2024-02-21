import { HikeCreationComponent } from './pages/hike-creation/hike-creation.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
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
import {MatMenuModule} from '@angular/material/menu'
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleMapsModule } from '@angular/google-maps';
import { NavComponent } from './nav/nav.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import {MatSliderModule} from '@angular/material/slider';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { RegisterComponent } from './pages/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InputComponent } from './components/input/input.component';
import { SigninComponent } from './pages/signin/signin.component';
import { ToastrModule } from 'ngx-toastr';
import { InterceptorInterceptor } from './assets/interceptor/interceptor.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HomeComponent } from './pages/home/home.component';
import { AllTrailsComponent } from './pages/all-trails/all-trails.component';
import { CommonModule } from '@angular/common'
import { FavouriteHikeComponent } from './pages/favourite-hikes/favourite-hikes.component';
import { TileComponent } from './components/tile/tile.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminHikesComponent } from './pages/admin-hikes/admin-hikes.component';

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
    FavouriteHikeComponent,
    InputComponent,
    AllTrailsComponent,
    TileComponent,
    AdminComponent,
    AdminHikesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'fr',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NoopAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSliderModule,
    MatMenuModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule ,
    MatButtonToggleModule,
    BrowserAnimationsModule,
    GoogleMapsModule,
    MatNativeDateModule,
    ToastrModule.forRoot(),
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
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
      
    },{ provide: HTTP_INTERCEPTORS, useClass: InterceptorInterceptor, multi: true },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
