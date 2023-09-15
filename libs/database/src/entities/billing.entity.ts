import { MainEntity } from './generic/base';

// BILLING {
//     string id PK
//     string subscription_id FK
//     float amount
//     string address
//     date billingDate
//     date created_at
//     date updated_at
// }

export default class Billing extends MainEntity {
  subscription_id: string;
  amount: number;
  address: string;
  billingDate: Date;
}
