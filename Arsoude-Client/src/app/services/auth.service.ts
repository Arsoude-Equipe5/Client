import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';

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
    lastName: string
  ) {
    return this.http.post(`${environment.apiUrl}/api/users/register`, {
      email: email,
      password: password,
      passwordconfirm: passwordconfirm,
      postalCode: postalCode,
      firstName: firstName,
      lastName: lastName,
    });
  }

  login(email: string, password: string) {
    return this.http.post(`${environment.apiUrl}/api/users/login`, {
      email,
      password,
    }).pipe(
      tap((response: any) => {
        const token = response.token;
        localStorage.setItem('token', token);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  }


  getHikes(){

    return this.http.get(`${environment.apiUrl}/api/hikes/gethikes`)

    
  }
}
