import type { Agorot } from './money';

export type FundType = 'pension' | 'gemel' | 'savings';

export interface Transaction {
  id: string;
  accountId: string;
  amount: Agorot;
  fundType: FundType;
  date: Date;
}

export interface User {
  id: string;
  role: 'customer' | 'admin';
  accountIds: string[];
}
