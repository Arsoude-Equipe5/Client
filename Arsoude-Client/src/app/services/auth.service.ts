import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const API_URL = '';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(
    email: string,
    password: string,
    postalCode: string,
    firstName: string,
    lastName: string
  ) {
    return this.http.post(API_URL, {
      email: email,
      password: password,
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
