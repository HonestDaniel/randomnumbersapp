import { Component } from '@angular/core';
import { RandomNumbersService } from "./services/random-numbers.service";
import {
  Observable,
} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  stream1$: Observable<number> | undefined;
  stream2$: Observable<number> | undefined;
  stream3$: Observable<number> | undefined;

  constructor(private randomNumbersService: RandomNumbersService) {}

  requestData(): void {
    this.stream1$ = this.randomNumbersService.fetchData();
    this.stream2$ = this.randomNumbersService.fetchData();
    this.stream3$ = this.randomNumbersService.fetchData();
  }
}
