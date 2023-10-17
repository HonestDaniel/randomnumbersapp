import { Component } from '@angular/core';
import {
  delay, mergeMap,
  Observable, of, share, tap,
} from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private http: HttpClient) {
    this.requestData();
  }

  stream1$: Observable<number> | undefined;
  stream2$: Observable<number> | undefined;
  stream3$: Observable<number> | undefined;

  requestData(): void {
    this.stream1$ = this.http.get<number>(
      'https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new'
    ).pipe(
      delay(1000),
      share()
    );

    this.stream2$ = this.stream1$.pipe(delay(2000));
    this.stream3$ = this.stream1$.pipe(delay(3000));
  }
}
