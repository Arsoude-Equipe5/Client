import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { jwtDecode }  from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(
    email: string,
    password: string,
    passwordconfirm: string,
    postalCode: string,
    firstName: string,
    lastName: string,
    address?: string | null
  ) {
    return this.http.post(`${environment.apiUrl}/api/Users/Register`, {
      email: email,
      password: password,
      passwordconfirm: passwordconfirm,
      postalCode: postalCode,
      firstName: firstName,
      lastName: lastName,
      address: address,
    });
  }

  login(email: string, password: string) {
    return this.http
      .post(`${environment.apiUrl}/api/users/login`, {
        email,
        password,
      })
      .pipe(
        tap((response: any) => {
          const token = response.token;
          localStorage.setItem('token', token);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getHikes() {
    return this.http.get(`${environment.apiUrl}/api/hikes/gethikes`);
  }

  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
  
    const decoded: any = jwtDecode(token);
    const roles = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    return Array.isArray(roles) ? roles.includes('Admin') : roles === 'Admin';
  }
}
