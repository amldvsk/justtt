import { Customer_Req } from '.';

export interface Transactions {
  transaction_id: number | null;
  total_price: number | null;
  currency: string | null;
  credit_card_type: string | null;
  credit_card_number: string | null;
}

export interface Transactions_Req extends Customer_Req {
  customer_uuid: string | null;
  total_price: number | null;
  currency: string | null;
  credit_card_type: string | null;
  credit_card_number: string | null;
}
