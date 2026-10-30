import { describe, expect, it } from 'vitest';
import { addAll, fromParts, mulBps } from '../src/money';

describe('money', () => {
  it('builds agorot from parts', () => {
    expect(fromParts(12, 34)).toBe(1234);
    expect(fromParts(-1, 50)).toBe(-150);
  });
  it('rejects invalid parts', () => {
    expect(() => fromParts(1.5)).toThrow(RangeError);
    expect(() => fromParts(1, 100)).toThrow(RangeError);
  });
  it('multiplies by basis points without rounding', () => {
    expect(mulBps(10000, 25)).toBe(250000);
  });
  it('adds integer amounts', () => {
    expect(addAll([100, 250, 5])).toBe(355);
    expect(() => addAll([1, 0.5])).toThrow(RangeError);
  });
});
