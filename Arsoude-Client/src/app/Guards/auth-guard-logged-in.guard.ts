import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardLoggedIn implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      // If user is already logged in, redirect to home page
      this.router.navigate(['/home']);
      this.toastr.warning('Please Log out before signing again.', 'Already logged in');
      return false; // Prevent access to the route
    } else {
      return true; // Allow access to the route
    }
  }
}
