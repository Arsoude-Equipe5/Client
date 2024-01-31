import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem('token');
    let objURL = new URL(request.url);
    // On validate que c'est une requête vers notre API
    if(objURL.hostname == "https://arsoude-equipe5.azurewebsites.net") {
      request = request.clone({
        setHeaders: {
          'Authorization': 'Bearer ' + token
        }
      })
    }
    return next.handle(request);
  }
}
