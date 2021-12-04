import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiDataService {
  public baseUrl = '';
  constructor() {}

  protected httpGet(path: string, options?: any): Observable<any> {
    return new Observable((observer: any) => {
      observer.complete();
    });
  }
  protected httpPost(path: string, options?: any): Observable<any> {
    return new Observable((observer: any) => {
      observer.complete();
    });
  }
  protected httpDelete(path: string, options?: any): Observable<any> {
    return new Observable((observer: any) => {
      observer.complete();
    });
  }
  protected httpPut(path: string, options?: any): Observable<any> {
    return new Observable((observer: any) => {
      observer.complete();
    });
  }
  protected httpPatch(path: string, options?: any): Observable<any> {
    return new Observable((observer: any) => {
      observer.complete();
    });
  }
}
