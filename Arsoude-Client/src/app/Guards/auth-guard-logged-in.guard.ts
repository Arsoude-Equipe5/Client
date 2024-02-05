import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardLoggedIn implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService, private translate: TranslateService) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      // If user is already logged in, redirect to home page
      this.router.navigate(['/home']);
      this.showWarning();
      return false; // Prevent access to the route
    } else {
      return true; // Allow access to the route
    }
  }

  showWarning() {
    this.translate.get('signin.logOutBeforeLogin').subscribe((message: string) => {
      const warningWord = this.translate.instant('signin.alreadyLogin'); // Translate the word "Success"
      const fullMessage = `${message} - ${warningWord}`; // Combine the translated message and word "Success"
      this.toastr.warning(fullMessage, warningWord);
    });
}
}
