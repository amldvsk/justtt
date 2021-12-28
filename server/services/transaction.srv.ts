import { Transactions_Req } from '../interfaces';
import { Transaction } from '../models/transactions';

class TransactionSrv {
  static async getAll(limit: number, page: number) {
    return new Transaction().getAll(limit, page);
  }
  static async get(transaction_id: number) {
    return new Transaction().get(transaction_id);
  }
  static async create(obj: Transactions_Req) {
    return new Transaction().create(obj);
  }
  static async update(transaction_id: number, obj: Transactions_Req) {
    return new Transaction().update(transaction_id, obj);
  }
  static async delete(transaction_id: number) {
    return new Transaction().delete(transaction_id);
  }
}

export { TransactionSrv };
