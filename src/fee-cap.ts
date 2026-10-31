const DEFAULT_CAP_AGOROT = 5000;

// Read the cap from the environment without depending on Node's type definitions.
function envValue(name: string): string | undefined {
  const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env;
  return env ? env[name] : undefined;
}

function readCap(): number {
  const raw = envValue('FEE_CAP_AGOROT');
  if (raw === undefined || raw === '') return DEFAULT_CAP_AGOROT;
  const n = Number(raw);
  if (!Number.isInteger(n) || n < 0) throw new Error(`FEE_CAP_AGOROT must be a non-negative integer, got "${raw}"`);
  return n;
}

export function capFee(fee: number, chargedThisMonth: number, cap: number = readCap()): number {
  if (!Number.isInteger(fee) || fee < 0) throw new RangeError('fee must be a non-negative integer (agorot)');
  if (!Number.isInteger(chargedThisMonth) || chargedThisMonth < 0) throw new RangeError('chargedThisMonth must be a non-negative integer (agorot)');
  const left = Math.max(0, cap - chargedThisMonth);
  return Math.min(fee, left);
}
