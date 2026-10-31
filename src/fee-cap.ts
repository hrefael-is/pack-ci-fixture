const CAP = Number(process.env.FEE_CAP_AGOROT ?? 5000);

export function capFee(fee: number, chargedThisMonth: number): number {
  const left = Math.max(0, CAP - chargedThisMonth);
  return Math.min(fee, left);
}
