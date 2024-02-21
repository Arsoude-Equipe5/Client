import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UpdateUserDTO } from '../models/UpdateUserDTO';

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
    address?: string | null,
    birthDate? : Date | undefined
  ) {
    return this.http.post(`${environment.apiUrl}/api/Users/Register`, {
      email: email,
      password: password,
      passwordconfirm: passwordconfirm,
      postalCode: postalCode,
      firstName: firstName,
      lastName: lastName,
      address: address,
      birthDate : birthDate
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

  getUserInfo() {
    return this.http.get<any>(`${environment.apiUrl}/api/Users/GetUserInfo`);
  }

  updateUser(updateUserDTO: UpdateUserDTO): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError('No token available');
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post<any>(`${environment.apiUrl}/api/Users/UpdateUser`, updateUserDTO, httpOptions)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';

    if (error.status === 400 && error.error && error.error.title === "One or more validation errors occurred.") {
      // If it's a validation error, construct the error message from the errors object
      errorMessage = Object.values(error.error.errors).join('\n');
    } else if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else if (error.status) {
      errorMessage = error.error || 'Server Error';
    }

    // Pass error message back to the calling component
    return throwError(errorMessage);
  }
}
