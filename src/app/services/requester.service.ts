import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequesterService {

  response$ = new Subject();

  constructor(private http: HttpClient) {

  }

  makeRequest(request: {method: string, url: string}) {
    return this.http.get(request.url).pipe(tap(result => this.response$.next(result)));
  }
}
