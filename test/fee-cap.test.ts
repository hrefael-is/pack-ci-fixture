import { expect, it } from 'vitest';
import { capFee } from '../src/fee-cap';
it('reduces the fee to what is left under the cap', () => { expect(capFee(300, 4900)).toBe(100); });
it('returns 0 once the cap is reached', () => { expect(capFee(300, 5000)).toBe(0); });
it('keeps the fee when there is room', () => { expect(capFee(300, 0)).toBe(300); });
