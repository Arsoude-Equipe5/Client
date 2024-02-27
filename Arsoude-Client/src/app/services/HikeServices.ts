import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HikeDTO } from '../models/HikeDTO';
import { FavouriteHikeComponent } from '../pages/favourite-hikes/favourite-hikes.component';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { HikePathDTO } from '../models/HikePathDTO';

@Injectable({
  providedIn: 'root',
})
export class HikeService {
  errorMessage: string = '';
  hikeList: HikePathDTO[] = [];
  myFavouriteList: HikePathDTO[] = [];

  selectedHike?: HikePathDTO;

  isWaiting: boolean = false;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private translate: TranslateService,
    private router: Router
  ) {}

  //static readonly isInFavouriteIcon: string = 'fas fa-regular fa-star';
  //static readonly isNotInFavouriteIcon: string = 'far fa-regular fa-star';

  async getHikes(): Promise<void> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' + token
      }),
    };

    console.log(environment.apiUrl);
    await this.http
      .get<HikePathDTO[]>(
        environment.apiUrl + '/api/Hikes/GetHikes',
        httpOptions
      )
      .subscribe((data) => {
        console.log(data);
        this.hikeList = data.map((hike) => ({
          ...hike,
          timeEstimated: this.parseTimeSpan(hike.timeEstimated),
          distance: hike.distance as number,
        }));
        if(this.hikeList.length>0){
          this.isEmpty=false;
        }
        console.log(this.hikeList);
      });
  }

  isEmpty: boolean = false;
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
        Authorization: 'Bearer ' + token,
      }),
    };
    console.log(token);
    console.log(httpOptions);

    return this.http.post<any>(
      environment.apiUrl + '/api/Hikes/CreateHike',
      hikeData,
      httpOptions
    );
  }

  async getFavouriteHikes(): Promise<void> {
    let token = localStorage.getItem('token');
    if (!token) {
      throw 'No token available';
      console.error('No token available');
    }
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };

    await this.http
      .get<HikePathDTO[]>(
        environment.apiUrl + '/api/Hikes/GetMyFavouriteHikes',
        httpOptions
      )
      .subscribe((x) => {
        console.log(x);
        this.myFavouriteList = x;
      });
  }

  searchHikes(keyword: string | null, type: string | null) {
    this.hikeList = [];
    let params = new HttpParams();

    if (keyword !== null) {
      params = params.append('keyword', keyword);
    }

    if (type !== null) {
      params = params.append('type', type);
    }

    this.isWaiting = true;
    return this.http
      .get<HikePathDTO[]>(`${environment.apiUrl}/api/Hikes/SearchHikes`, {
        params: params,
      })
      .subscribe({
        next: (res) => {
          console.log(res);

          this.hikeList = res;
          this.isEmpty = false;
          this.isWaiting = false;

          if (this.hikeList.length === 0) {
            this.isEmpty = true;
          }

          console.log(this.isEmpty);
          
        },
        error: (err) => {
          console.log(err);
          this.isWaiting = false;
          alert(err.statusText);
        },
      });
  }

  addFavouriteHikes(idHikeSelectAddFavourite: number): void {
    if (!navigator.onLine) {
      this.translate
        .get('hikeServices.unableAdd')
        .subscribe((message: string) => {
          this.toastr.error(
            message,
            this.translate.instant('hikeServices.offline')
          );
        });
      return;
    }

    let token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/signin']);
      throw 'No token available';

      console.error('No token available');
    }
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };

    this.http
      .post(
        environment.apiUrl +
          '/api/Hikes/AddFavourite/' +
          idHikeSelectAddFavourite,
        httpOptions
      )
      .subscribe((x) => {
        console.log(x);
      });
  }

  isInFavourite(hike: HikeDTO): string {
    //Display icon when the hike is not in favourite (empty star)
    const isNotInFavouriteIcon: String = 'far fa-regular fa-star';

    //Display icon when the hike is in favourite (full star)
    const isInFavouriteIcon: String = 'fas fa-regular fa-star';

    // Check if any element in myFavouriteList has the same ID as the given hike
    if (this.myFavouriteList.some((favorite) => favorite.id === hike.id)) {
      return isInFavouriteIcon.toString();
    } else {
      return isNotInFavouriteIcon.toString();
    }
  }

  async getAdminHikes(statusFilter?: string): Promise<void> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' + token
      }),
      params: statusFilter
        ? new HttpParams().set('statusFilter', statusFilter)
        : {},
    };

    console.log(environment.apiUrl);
    await this.http
      .get<HikePathDTO[]>(
        environment.apiUrl + '/api/Hikes/GetAdminHikes',
        httpOptions
      )
      .subscribe((data) => {
        console.log(data);
        this.hikeList = data.map((hike) => ({
          ...hike,
          timeEstimated: this.parseTimeSpan(hike.timeEstimated),
          distance: hike.distance as number,
        }));
        console.log(this.hikeList);
      });
  }

  updateHikeStatus(id: number, status: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' + token
      }),
      responseType: 'text' as 'json', // Tell Angular to expect a text response, not JSON
    };

    return this.http.put<any>(
      `${environment.apiUrl}/api/Hikes/UpdateHikeStatus/${id}/status`,
      { Status: status },
      httpOptions
    );
  }


  async getSelectedHike(selectedHikeId:number): Promise<void> {

    this.selectedHike = undefined;
    console.log("this is the id selected: " + selectedHikeId);
    await this.http.get<HikePathDTO>(environment.apiUrl + '/api/Hikes/GetHike/' + selectedHikeId).subscribe(x => {
      console.log("The selected Hike: " + x.name);
      this.selectedHike = x;

    })
  }
}
