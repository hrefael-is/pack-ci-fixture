import { monthKey } from './dates';

export function statementTitle(accountId: string, d: Date): string {
  return `Statement ${accountId} ${monthKey(d)}`;
}
