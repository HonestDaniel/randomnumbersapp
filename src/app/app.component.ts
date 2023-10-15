import { Component } from '@angular/core';
import {
  delay,
  Observable, share, Subject,
} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private http: HttpClient) {
  }

  requestInvoked = true;
  source$: Subject<number> = new Subject<number>();
  multicasted$: Observable<number> = this.source$.pipe(share());
  stream1$: Observable<number> | undefined;
  stream2$: Observable<number> | undefined;
  stream3$: Observable<number> | undefined;

  requestData(): void {
    this.fetchData(this.requestInvoked);
    this.requestInvoked = false;

    if (this.multicasted$) {
      this.stream1$ = this.multicasted$.pipe(delay(1000));
      this.stream2$ = this.multicasted$.pipe(delay(2000));
      this.stream3$ = this.multicasted$.pipe(delay(3000));
    }
  }
  fetchData(requestInvoked: boolean) {
    let cancelRequest = new Subject<void>();
    this.http.get<number>(
      'https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new'
    )
      .pipe(takeUntil(cancelRequest), delay(1000))
      .subscribe((data) => {
        this.source$.next(data);
        this.requestInvoked = true;
      })

    if (!requestInvoked) {
      cancelRequest.next()
    }
  }
}
