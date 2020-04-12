import { cold, getTestScheduler } from 'jasmine-marbles';
import { of, from, interval, timer, generate, range } from 'rxjs';
import { take } from 'rxjs/operators';

describe('Creators', () => {
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

  test('timer', () => {
    const source = timer(30, 10, getTestScheduler()).pipe(take(4));
    const expected = cold('---abc(d|)', { a: 0, b: 1, c: 2, d: 3 });
    expect(source).toBeObservable(expected);
  });

  test('generate', () => {
    const source = generate(
      0,
      x => x <= 3,
      x => x + 1,
    );
    const expected = cold('(abcd|)', { a: 0, b: 1, c: 2, d: 3 });
    expect(source).toBeObservable(expected);
  });

  test('range', () => {
    const source = range(0, 4);
    const expected = cold('(abcd|)', { a: 0, b: 1, c: 2, d: 3 });
    expect(source).toBeObservable(expected);
  });
});
