import { cold, getTestScheduler } from 'jasmine-marbles';
import { iif, of, from, interval, timer, generate, range, defer } from 'rxjs';
import { take, concatMap, delay } from 'rxjs/operators';

describe('Creators', () => {
  test.each([
    [[0, 1, 2, 3], '(abcd|)', { a: 0, b: 1, c: 2, d: 3 }],
    [[], '|', {}],
  ])('from %p to %p => %p', (input, marblesSeq, marblesObj) => {
    const source = from(input);
    const expected = cold(marblesSeq, marblesObj);
    expect(source).toBeObservable(expected);
  });

  test.each([
    [[0, 1, 2, 3], '(a|)', { a: [0, 1, 2, 3] }],
    [[], '(a|)', { a: [] }],
  ])('of %p to %p => %p', (input, marblesSeq, marblesObj) => {
    const source = of(input);
    const expected = cold(marblesSeq, marblesObj);
    expect(source).toBeObservable(expected);
  });

  test.each([
    [10, '-abc(d|)', { a: 0, b: 1, c: 2, d: 3 }],
    [0, '(abcd|)', { a: 0, b: 1, c: 2, d: 3 }],
    [20, '--a-b-c-(d|)', { a: 0, b: 1, c: 2, d: 3 }],
  ])('interval %p to %p => %p', (input, marblesSeq, marblesObj) => {
    const source = interval(input, getTestScheduler()).pipe(take(4));
    const expected = cold(marblesSeq, marblesObj);
    expect(source).toBeObservable(expected);
  });

  describe('defer', () => {
    test('from array', () => {
      const source = defer(() => from([0, 1, 2, 3]));
      const expected = cold('(abcd|)', { a: 0, b: 1, c: 2, d: 3 });
      expect(source).toBeObservable(expected);
    });
    test('from array with time delay', () => {
      const source = defer(() =>
        from([0, 1, 2, 3]).pipe(
          concatMap((x, i) =>
            of(x).pipe(delay(i === 0 ? 0 : 20, getTestScheduler())),
          ),
        ),
      );
      const expected = cold('a-b-c-(d|)', { a: 0, b: 1, c: 2, d: 3 });
      expect(source).toBeObservable(expected);
    });
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

  describe('range', () => {
    test('with default step [=1]', () => {
      const source = range(4);
      const expected = cold('(abcd|)', { a: 0, b: 1, c: 2, d: 3 });
      expect(source).toBeObservable(expected);
    });
    test('with custom step', () => {
      const source = range(12, 4);
      const expected = cold('(abcd|)', { a: 12, b: 13, c: 14, d: 15 });
      expect(source).toBeObservable(expected);
    });
  });

  describe('iif', () => {
    test.each([
      [true, 'one', 'two', '(a|)', { a: 'one' }],
      [false, 'one', 'two', '(a|)', { a: 'two' }],
    ])('iif %p, %p, %p to %p %p', (cond, one, two, marblesSeq, marblesObj) => {
      const first = of(one);
      const second = of(two);
      const source = iif(() => cond, first, second);
      const expected = cold(marblesSeq, marblesObj);
      expect(source).toBeObservable(expected);
    });
  });
});
