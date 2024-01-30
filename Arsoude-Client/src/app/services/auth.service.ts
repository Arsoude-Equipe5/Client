import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

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
    });
  }

  logout() {
    throw new Error('Methode not implemented');
  }
}
