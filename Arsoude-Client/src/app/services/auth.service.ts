import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    return this.http.post('https://localhost:7205/api/Users/Register', {
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
