const DEFAULT_CAP_AGOROT = 5000;

// Read the cap from the environment without depending on Node's type definitions.
function envValue(name: string): string | undefined {
  const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env;
  return env ? env[name] : undefined;
}

function assertAgorot(name: string, value: number): void {
  if (!Number.isInteger(value) || value < 0) throw new RangeError(`${name} must be a non-negative integer (agorot)`);
}

// Unset → default. Set → digits only (no spaces, signs, decimals or exponents), else an error.
export function readCap(): number {
  const raw = envValue('FEE_CAP_AGOROT');
  if (raw === undefined) return DEFAULT_CAP_AGOROT;
  if (!/^[0-9]+$/.test(raw)) throw new Error(`FEE_CAP_AGOROT must be a non-negative whole number of agorot, got "${raw}"`);
  return Number(raw);
}

export function capFee(fee: number, chargedThisMonth: number, cap: number = readCap()): number {
  assertAgorot('fee', fee);
  assertAgorot('chargedThisMonth', chargedThisMonth);
  assertAgorot('cap', cap);
  const left = Math.max(0, cap - chargedThisMonth);
  return Math.min(fee, left);
}
