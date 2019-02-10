import { expect } from 'chai';
import 'mocha';
import { take } from 'rxjs/operators';
import { Counter } from './Counter';

describe('Test interval', () => {
  it('should count to 3', done => {
    const result: number[] = [];
    const expected = [0, 1, 3];
    const counter = new Counter(1);
    const customSource = counter.source.pipe(take(3));
    customSource.subscribe({
      complete: () => {
        expect(JSON.stringify(result) === JSON.stringify(expected));
        done();
      },
      next: val => result.push(val)
    });
  });
});
