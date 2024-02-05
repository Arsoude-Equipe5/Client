import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  language: string = "fr";
  
  constructor(public translator: TranslateService, private authService: AuthService,    private router: Router // Inject Router) {
    translator.setDefaultLang(this.language);
  }
  
  changeLanguage(lang: string, event: Event): void {
    event.preventDefault();  // Prevent the default behavior of the anchor element
    this.language = lang;
    this.translator.use(this.language);
  }
  
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']); // Redirect to home page after logout
  }
}
