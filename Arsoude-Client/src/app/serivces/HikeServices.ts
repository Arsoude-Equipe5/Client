import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HikeDTO } from '../models/HikeDTO';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class HikeService {
  private baseURL = 'http://localhost:5020'; // Replace with your actual API endpoint URL
  private authToken: string = '';

  constructor(private http: HttpClient) { }
  

  createHike(hikeData: HikeDTO): Observable<any> {

    //only use the httpOptions to test the HikeCreation must look like this return this.http.post<any>(this.baseURL + '/api/Hikes/CreateHike', hikeData ,httpOptions ) }

    let httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      })
    }

    return this.http.post<any>(this.baseURL + '/api/Hikes/CreateHike', hikeData, httpOptions) }


    ///Uncomment to test the hike creation
    async login(): Promise<void> {
      const loginDto = {
        Email: "jean@robert.com",
        Password: "Passw0rd!"
      };
      let x = await lastValueFrom(this.http.post<any>(this.baseURL + "/api/Users/Login/",loginDto));
      console.log(x)
      localStorage.setItem("token",x.token)
    }
}