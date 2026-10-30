/** Money is an integer number of agorot. Never use floating-point shekels. */
export type Agorot = number;

export function assertAgorot(value: number, name = 'amount'): void {
  if (!Number.isSafeInteger(value)) {
    throw new RangeError(`${name} must be an integer number of agorot, got ${value}`);
  }
}

export function fromParts(shekels: number, agorot = 0): Agorot {
  if (!Number.isSafeInteger(shekels) || !Number.isSafeInteger(agorot) || agorot < 0 || agorot > 99) {
    throw new RangeError(`invalid amount ${shekels}.${agorot}`);
  }
  return shekels * 100 + (shekels < 0 ? -agorot : agorot);
}

/** amount × rate in basis points, before rounding (result is in units of 1/10000 agora). */
export function mulBps(amount: Agorot, bps: number): number {
  assertAgorot(amount);
  if (!Number.isSafeInteger(bps) || bps < 0) throw new RangeError(`invalid rate ${bps} bps`);
  return amount * bps;
}

export function addAll(values: Agorot[]): Agorot {
  return values.reduce((sum, v) => {
    assertAgorot(v);
    return sum + v;
  }, 0);
}
