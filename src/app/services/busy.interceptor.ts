import {
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BusyInterceptor implements HttpInterceptor {
  private inProgressCount = 0;
  private submittingCount = 0;
  private gettingCount = 0;

  constructor() {}

  public isSessionIsAliveGet(req: HttpRequest<any>): boolean {
    if (req && req.method === 'GET' && req.url.includes('session/isalive')) {
      return true;
    }
    return false;
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<
    HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>
  > {
    this.inProgressCount++;
    if (req.method === 'PUT' || req.method === 'POST' || req.method === 'DELETE') {
      this.submittingCount++;
    }

    if (req.method === 'GET' && !this.isSessionIsAliveGet(req)) {
      this.gettingCount++;
      // this.service.isGetting = true;
    }
    return next.handle(req).pipe(
      finalize(() => {
        this.inProgressCount--;

        if (req.method === 'PUT' || req.method === 'POST' || req.method === 'DELETE') {
          this.submittingCount--;
          if (this.submittingCount <= 0) {
            // this.service.isSubmitting = false;
          }
        }

        if (req.method === 'GET' && !this.isSessionIsAliveGet(req)) {
          this.gettingCount--;
          if (this.gettingCount <= 0) {
            // this.service.isGetting = false;
          }
        }
      }),
      catchError((err: any) => {
        if (err.status === 0 || err.status === -1) {
          this.gettingCount--;
          if (this.gettingCount <= 0) {
            // this.service.isGetting = false;
          }
        }
        return observableThrowError(err);
      })
    );
  }
}

function observableThrowError(err: any) {
  throw new Error('Function not implemented.');
}
