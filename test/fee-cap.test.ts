import { afterEach, expect, it } from 'vitest';
import { capFee } from '../src/fee-cap';
const env = (globalThis as unknown as { process: { env: Record<string, string | undefined> } }).process.env;
afterEach(() => { delete env.FEE_CAP_AGOROT; });
it('reduces the fee to what is left under the cap', () => { expect(capFee(300, 4900, 5000)).toBe(100); });
it('returns 0 once the cap is reached', () => { expect(capFee(300, 5000, 5000)).toBe(0); });
it('returns 0 when the month is already above the cap', () => { expect(capFee(300, 6000, 5000)).toBe(0); });
it('keeps the fee when there is room', () => { expect(capFee(300, 0, 5000)).toBe(300); });
it('uses the default cap of 5000 when none is configured', () => { expect(capFee(300, 4900)).toBe(100); });
it('reads the cap from FEE_CAP_AGOROT', () => { env.FEE_CAP_AGOROT = '1000'; expect(capFee(300, 900)).toBe(100); });
it('accepts a configured cap of 0', () => { env.FEE_CAP_AGOROT = '0'; expect(capFee(300, 0)).toBe(0); });
for (const bad of ['abc', '', '   ', '-1', '1.5', '1e3', ' 100']) {
  it(`rejects FEE_CAP_AGOROT=${JSON.stringify(bad)}`, () => { env.FEE_CAP_AGOROT = bad; expect(() => capFee(300, 0)).toThrow(/FEE_CAP_AGOROT/); });
}
it('rejects a negative or fractional fee', () => { expect(() => capFee(-1, 0, 5000)).toThrow(RangeError); expect(() => capFee(1.5, 0, 5000)).toThrow(RangeError); });
it('rejects a negative or fractional chargedThisMonth', () => { expect(() => capFee(300, -1, 5000)).toThrow(RangeError); expect(() => capFee(300, 0.5, 5000)).toThrow(RangeError); });
it('rejects a NaN, negative or fractional explicit cap', () => { expect(() => capFee(300, 0, Number.NaN)).toThrow(RangeError); expect(() => capFee(300, 0, -5)).toThrow(RangeError); expect(() => capFee(300, 0, 2.5)).toThrow(RangeError); });
