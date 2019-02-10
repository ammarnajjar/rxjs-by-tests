import { interval, Observable } from 'rxjs';

export class Counter {
  public source: Observable<number>;

  constructor(intervalValue: number) {
    // create an Observable from interval
    this.source = interval(intervalValue);
  }

  public count() {
    // store the subscription
    const subscription = this.source.subscribe(val => console.log(val));

    // unsubscribe after 5 secs
    setTimeout(() => {
      subscription.unsubscribe();
    }, 5000);
  }
}
