import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {delay, Observable, Subject} from 'rxjs';
import {takeUntil} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RandomNumbersService {

  private cancelRequest$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  fetchData(): Observable<number> {
    return this.http.get<number>('https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new')
      .pipe(
        delay(1000),
        takeUntil(this.cancelRequest$)
      );
  }
}
