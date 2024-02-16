import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
    await this.http.get<HikeDTO[]>(environment.apiUrl + '/api/Hikes/GetHikes', httpOptions).subscribe(data => {
      console.log(data);
      this.hikeList = data.map(hike => ({
          ...hike,
          timeEstimated: this.parseTimeSpan(hike.timeEstimated),
          distance: hike.distance as number
      }));
      console.log(this.hikeList);
  });
  }
  
  isEmpty :boolean=false;
  private parseTimeSpan(timeSpan: string): string {
    const [hours, minutes, seconds] = timeSpan.split(':');

    const hoursNumber = parseInt(hours, 10);
    const minutesNumber = parseInt(minutes, 10);
    const secondsNumber = parseInt(seconds, 10);

    let formattedTimeSpan = '';
    if (hoursNumber > 0) {
        formattedTimeSpan += hoursNumber + 'h ';
    }
    if (minutesNumber > 0) {
        formattedTimeSpan += minutesNumber + 'm ';
    }
    if (secondsNumber > 0) {
        formattedTimeSpan += secondsNumber + 's';
    }

    return formattedTimeSpan.trim();
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
  
  



  searchHikes(keyword:string, type:string|null){
    this.hikeList = [];
    let params = new HttpParams();
    params = params.set('keyword', keyword);
    if (type !== null) {
      params = params.append('type', type);
    }

      return this.http.get<HikeDTO[]>(`${environment.apiUrl}/api/Hikes/SearchHikes`,{params : params}).subscribe({

        next : (res) =>{

          console.log(res);

    this.hikeList = res;
    this.isEmpty=false;

    if(this.hikeList.length === 0){

      this.isEmpty=true;
    } 


    
          
        }, error : (err)=>{


          console.log(err);
          
        }

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
        return "fas fa-regular fa-star";
    } else {
        return "far fa-regular fa-star";
    }
}
  
  

  
}
