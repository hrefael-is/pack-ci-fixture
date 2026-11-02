import { describe, expect, it } from 'vitest';
import { splitEvenly } from '../src/split';

describe('splitEvenly', () => {
  it('puts the remainder on the first shares', () => {
    expect(splitEvenly(1000, 3)).toEqual([334, 333, 333]);
  });
  it('always adds up to the total', () => {
    for (const [total, parts] of [[1000, 3], [7, 7], [1, 4], [-1001, 4]]) {
      expect(splitEvenly(total, parts).reduce((a, b) => a + b, 0)).toBe(total);
    }
  });
  it('handles negative totals without negative zero', () => {
    expect(splitEvenly(-1, 3)).toEqual([-1, 0, 0]);
    expect(Object.is(splitEvenly(-1, 3)[2], 0)).toBe(true);
  });
  it('rejects invalid input', () => {
    expect(() => splitEvenly(10.5, 2)).toThrow(RangeError);
    expect(() => splitEvenly(10, 0)).toThrow(RangeError);
    expect(() => splitEvenly(10, 1.5)).toThrow(RangeError);
  });
});
