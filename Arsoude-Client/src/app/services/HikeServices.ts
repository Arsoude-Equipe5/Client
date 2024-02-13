import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
      this.isEmpty=false;

      if(this.hikeList.length === 0){

        this.isEmpty=true;
      } 
       

      
    })
  } 
  
  hikeList: HikeDTO[] = [];
  isEmpty :boolean=false;

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



  searchHikes(keyword:string){
    this.hikeList = [];
    let params = new HttpParams();
    params = params.set('keyword', keyword)

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




}
