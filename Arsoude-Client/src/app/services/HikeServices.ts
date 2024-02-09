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

   async getHikes():Promise<void>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        // 'Authorization': 'Bearer ' + token
      })
    };

    await this.http.get<HikeDTO[]>(environment.apiUrl + '/api/Hikes/GetHikes', httpOptions).subscribe(x => {
      console.log(x);
      this.hikeList = x;
    })
  } 
  
  hikeList: HikeDTO[] = [];


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






  // async getFavouriteHikes():Promise<void>{
  //   let httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //       // 'Authorization': 'Bearer ' + token
  //     })
  //   };

  //   await this.http.get<HikeDTO[]>(environment.apiUrl + '/api/Hikes/GetMyFavouriteHikes', httpOptions).subscribe(x => {
  //     console.log(x);
  //     this.hikeList = x;
  //   })
  // } 


  // async addFavouriteHikes():Promise<void>{
  //   let httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //       // 'Authorization': 'Bearer ' + token
  //     })
  //   };

  //   await this.http.get<HikeDTO[]>(environment.apiUrl + '/api/Hikes/AddFavourite/' + hikeId, httpOptions).subscribe(x => {
  //     console.log(x);
  //     this.hikeList = x;
  //   })
  // } 
  

  
}
