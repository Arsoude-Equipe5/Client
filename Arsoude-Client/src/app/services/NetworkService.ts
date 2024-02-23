import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private isOnlineSubject = new BehaviorSubject<boolean>(navigator.onLine);
  isOnline$: Observable<boolean> = this.isOnlineSubject.asObservable();

  constructor(private http: HttpClient) {
    window.addEventListener('online', () => this.updateNetworkStatus());
    window.addEventListener('offline', () => this.updateNetworkStatus());
  }

  private updateNetworkStatus() {
    this.isOnlineSubject.next(navigator.onLine);
  }

  checkInternetConnectivity(): Observable<boolean> {
    return this.http.get('https://www.google.com', { observe: 'response' })
      .pipe(
        map(response => response.status === 200),
        catchError(() => of(false))
      );
  }
}
