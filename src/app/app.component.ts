import { Component } from '@angular/core';
import {
  delay, mergeMap,
  Observable, of, share, shareReplay, Subject, switchMap, tap,
} from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  stream1$: Observable<number> | undefined;
  stream2$: Observable<number> | undefined;
  stream3$: Observable<number> | undefined;
  refresh$: Observable<number> | undefined;
  refreshTrigger$ = new Subject<void>();

  constructor(private http: HttpClient) {
    this.refresh$ = this.refreshTrigger$.pipe(
      switchMap(() => this.fetchData()),
      shareReplay(1)
    );

    this.stream1$ = this.refresh$.pipe(delay(1000));
    this.stream2$ = this.refresh$.pipe(delay(2000));
    this.stream3$ = this.refresh$.pipe(delay(3000));
  }

  refreshData(): void {
    this.refreshTrigger$.next();
  }

  private fetchData(): Observable<number> {
    return this.http.get<number>(
      'https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new'
    )
  }
}
