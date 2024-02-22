import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService, 
    private router: Router,
    private toastr: ToastrService, 
    private translate: TranslateService
  ) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn() && this.authService.isAdmin()) {
      // User is logged in and has admin role
      return true;
    } else {
      // User is not logged in or doesn't have admin role
      this.showWarning();
      this.router.navigate(['/signin']); // or another appropriate route
      return false;
    }
  }
  showWarning() {
    this.translate.get('warning.accessDenied').subscribe((message: string) => {
      const warningTitle = this.translate.instant('admin.accessDenied');
      this.toastr.warning(message, warningTitle);
    });
  }
}  
