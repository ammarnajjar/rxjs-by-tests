import { interval } from 'rxjs';

// create an Observable from interval of 1 sec
const source = interval(1000);

// store the subscription
const subscription = source.subscribe(val => console.log(val));

// unsubscribe after 5 secs
setTimeout(() => {
  subscription.unsubscribe();
}, 5000);

