import { Counter } from './Counter';

(() => {
  const counter = new Counter(1000);
  counter.count();
})();
