import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router,private toastr: ToastrService, private translate: TranslateService) {

  }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/signin']); // Redirect to signin page if not logged in
      this.showWarning();

      return false;
    }
  }
  showWarning() {
    this.translate.get('signin.logBeforeCreate').subscribe((message: string) => {
      const warningWord = this.translate.instant('signin.loginRequired'); // Translate the word "Success"
      const fullMessage = `${message} - ${warningWord}`; // Combine the translated message and word "Success"
      this.toastr.warning(fullMessage, warningWord);
    });
}
}
