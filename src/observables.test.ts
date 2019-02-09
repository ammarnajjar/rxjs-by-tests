import { cold, getTestScheduler } from 'jasmine-marbles';
import { of, from, interval } from 'rxjs';
import { take } from 'rxjs/operators';

describe('Observbles', () => {
  const xArray = [0, 1, 2, 3];

  test('from', () => {
    const source = from(xArray);
    const expected = cold('(abcd|)', { a: 0, b: 1, c: 2, d: 3 });
    expect(source).toBeObservable(expected);
  });

  test('of', () => {
    const source = of(xArray);
    const expected = cold('(a|)', { a: [0, 1, 2, 3] });
    expect(source).toBeObservable(expected);
  });

  test('interval', () => {
    const source = interval(10, getTestScheduler()).pipe(take(4));
    const expected = cold('-abc(d|)', { a: 0, b: 1, c: 2, d: 3 });
    expect(source).toBeObservable(expected);
  });
});
