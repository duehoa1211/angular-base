import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthencationTokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    try {
      const authorizationToken = sessionStorage.getItem('token');
      if (authorizationToken) {
        const headers: HttpHeaders = req.headers.set(
          'Authentication',
          `Bearer ${authorizationToken}`
        );
        req = req.clone({ headers });
      }
      return next.handle(req);
    } catch (error) {
      return next.handle(req);
    }
  }
}
