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
    return this.http.post(`${environment}/api/users/register`, {
      email: email,
      password: password,
      passwordconfirm: passwordconfirm,
      postalCode: postalCode,
      firstName: firstName,
      lastName: lastName,
    });
  }

  login() {
    throw new Error('Methode not implemented');
  }

  logout() {
    throw new Error('Methode not implemented');
  }
}
