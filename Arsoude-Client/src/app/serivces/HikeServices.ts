import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HikeDTO } from '../models/HikeDTO';

@Injectable({
  providedIn: 'root'
})
export class HikeService {
  private baseURL = 'http://localhost:5020/api/Hikes/'; // Replace with your actual API endpoint URL

  constructor(private http: HttpClient) { }

  createHike(hikeData: HikeDTO): Observable<any> {
    return this.http.post<any>(this.baseURL + 'CreateHike', hikeData) }
}
