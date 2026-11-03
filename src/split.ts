import { assertAgorot, type Agorot } from './money';

/** Splits an amount into `parts` shares that differ by at most 1 agora and add up exactly to the total. */
export function splitEvenly(total: Agorot, parts: number): Agorot[] {
  assertAgorot(total, 'total');
  if (!Number.isSafeInteger(parts) || parts < 1) {
    throw new RangeError(`parts must be a positive integer, got ${parts}`);
  }
  const sign = total < 0 ? -1 : 1;
  const abs = Math.abs(total);
  const base = Math.floor(abs / parts);
  const extra = abs % parts;
  return Array.from({ length: parts }, (_, i) => {
    const share = base + (i < extra ? 1 : 0);
    return share === 0 ? 0 : sign * share;
  });
}
