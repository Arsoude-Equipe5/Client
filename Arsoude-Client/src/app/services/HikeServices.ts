import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HikeDTO } from '../models/HikeDTO';

@Injectable({
  providedIn: 'root'
})
export class HikeService {

  constructor(private http: HttpClient) { }
  

  createHike(hikeData: HikeDTO): Observable<any> {
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
    console.log(token)
    console.log(httpOptions)

    return this.http.post<any>(environment.apiUrl + '/api/Hikes/CreateHike', hikeData, httpOptions);
  }
}