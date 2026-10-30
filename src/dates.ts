/** Month key used to group transactions and title statements. */
export function monthKey(d: Date): string {
  return `${d.getUTCFullYear()}-${d.getUTCMonth()}`;
}
