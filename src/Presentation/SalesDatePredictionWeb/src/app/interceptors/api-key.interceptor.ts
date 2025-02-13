import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  private apiKey = environment.apikey;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes(environment.endPoint)) {
      const secureReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type' : 'application/json; charset=utf-8',
          'Accept'       : 'application/json',
          'Authorization': `basic ${environment.userpass}`,
          'x-api-key':`${environment.apikey}`
        })
      });
      return next.handle(secureReq);
    }

    // Forward requests to non-secure APIs without modifying
    return next.handle(req);
  }
}