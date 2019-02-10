import { take } from 'rxjs/operators';
import { expect } from 'chai';
import 'mocha';
import { Counter } from './Counter';

describe('Test interval', () => {

  it('should count to 3', (done) => {
    let result : number[] = [];
    const expected = [0,1,3];
    const counter = new Counter(1);
    const customSource = counter.source.pipe(take(3));
    customSource.subscribe({
      next: val => result.push(val),
      complete: () => {
        expect(JSON.stringify(result) === JSON.stringify(expected));
        done();
      }
    });
  });
});
