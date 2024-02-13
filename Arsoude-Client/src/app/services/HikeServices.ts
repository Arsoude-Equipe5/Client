import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HikeDTO } from '../models/HikeDTO';
import { FavouriteHikeComponent } from '../pages/favourite-hikes/favourite-hikes.component';

@Injectable({
  providedIn: 'root'
})
export class HikeService {

   
  
  hikeList: HikeDTO[] = [];
  myFavouriteList: HikeDTO[] = [];


  constructor(private http: HttpClient) { }

  async getHikes():Promise<void>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        // 'Authorization': 'Bearer ' + token
      })
    };

    console.log(environment.apiUrl);
    await this.http.get<HikeDTO[]>(environment.apiUrl + '/api/Hikes/GetHikes', httpOptions).subscribe(x => {
      console.log(x);
      this.hikeList = x;
    })
  }
  

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






  async getFavouriteHikes():Promise<void>{
    let token = localStorage.getItem("token");
    if (!token) {
      throw('No token available');
      console.error('No token available');
    }
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };


    await this.http.get<HikeDTO[]>(environment.apiUrl + '/api/Hikes/GetMyFavouriteHikes', httpOptions).subscribe(x => {
      console.log(x);
      this.myFavouriteList = x
    })
  }
  
  

  addFavouriteHikes(idHikeSelectAddFavourite: number): void {

    let token = localStorage.getItem("token");
    if (!token) {
      throw('No token available');
      console.error('No token available');
    }
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
      //maybe build country here????
      this.http.post(environment.apiUrl + '/api/Hikes/AddFavourite/' + idHikeSelectAddFavourite, httpOptions).subscribe(x => {
        console.log(x);
      })
  }


 

  isInFavourite(hike: HikeDTO): string {
    // Check if any element in myFavouriteList has the same ID as the given hike
    if (this.myFavouriteList.some(favorite => favorite.id === hike.id)) {
        console.log("fas fa-regular fa-star");
        return "fas fa-regular fa-star";
    } else {
        console.log("far fa-regular fa-star");
        return "far fa-regular fa-star";
    }
}
  
  

  
}
