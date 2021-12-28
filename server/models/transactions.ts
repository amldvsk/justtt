import { Customers } from './customers';
import { Transactions_Req } from '../interfaces';
import db from '../database/db';

class Transaction {
  table = 'transactions';
  tx = null;

  async getAll(limit: number = 10, page: number = 1) {
    return (this.tx || db)
      .from(this.table)
      .joinRaw(
        'join transaction_versions on transaction_versions.transaction_id = transactions.transaction_id and end_at is null'
      )
      .joinRaw('join customer_versions on customer_versions.customer_version_id = transactions.customer_version_id')
      .joinRaw('join customers on customers.customer_id = customer_versions.customer_id')
      .where('transaction_versions.active', true)
      .limit(limit)
      .offset(limit * page);
  }

  async get(transaction_id: number) {
    const find = await (this.tx || db)
      .from(this.table)
      .joinRaw(
        'join transaction_versions on transaction_versions.transaction_id = transactions.transaction_id and end_at is null'
      )
      .joinRaw('join customer_versions on customer_versions.customer_version_id = transactions.customer_version_id')
      .joinRaw('join customers on customers.customer_id = customer_versions.customer_id')
      .where('transactions.transaction_id', transaction_id)
      .where('transaction_versions.active', true)
      .first();
    if (!find) {
      throw `${transaction_id} not found`;
    }
    return find;
  }

  async create(obj: Transactions_Req) {
    const run = async (tx: any) => {
      const customers = new Customers(tx);
      let customer = await customers.get(null, obj.customer_uuid);
      if (!customer) {
        customer = await customers.create({
          customer_uuid: obj.customer_uuid,
          first_name: obj.first_name,
          last_name: obj.last_name,
          email: obj.email,
          gender: obj.gender,
          country: obj.country,
          city: obj.city,
          street: obj.street,
          phone: obj.phone,
        });
      }
      const [transaction_id] = await tx(this.table)
        .insert({
          customer_version_id: customer.customer_version_id,
        })
        .returning('transaction_id');

      const [transaction_version_id] = await tx('transaction_versions')
        .insert({
          transaction_id,
          total_price: obj.total_price,
          currency: obj.currency,
          credit_card_type: obj.credit_card_type,
          credit_card_number: obj.credit_card_number,
        })
        .returning('transaction_version_id');

      return { transaction_version_id, transaction_id };
    };
    if (this.tx) return run(this.tx);
    return db.transaction(run);
  }

  async update(transaction_id_unm: number, obj: Transactions_Req) {
    const run = async (tx: any) => {
      const transaction = await tx(this.table)
        .joinRaw(
          'join transaction_versions on transaction_versions.transaction_id = transactions.transaction_id and transaction_versions.end_at is null'
        )
        .where('transaction_versions.transaction_id', transaction_id_unm)
        .first();

      await tx('transaction_versions')
        .update({
          end_at: db.fn.now(),
        })
        .where({ transaction_version_id: transaction.transaction_version_id });

      const [transaction_version_id] = await tx('transaction_versions')
        .insert({
          transaction_id: transaction_id_unm,
          total_price: obj.total_price,
          currency: obj.currency,
          credit_card_type: obj.credit_card_type,
          credit_card_number: obj.credit_card_number,
        })
        .returning('transaction_version_id');

      return { transaction_version_id };
    };
    if (this.tx) return run(this.tx);
    return db.transaction(run);
  }

  async delete(transaction_id_unm: number) {
    const run = async (tx: any) => {
      const transaction = await tx(this.table)
        .joinRaw(
          'join transaction_versions on transaction_versions.transaction_id = transactions.transaction_id and transaction_versions.end_at is null'
        )
        .where('transaction_versions.transaction_id', transaction_id_unm)
        .first();

      const last_version = await tx('transaction_versions')
        .where({ transaction_version_id: transaction.transaction_version_id })
        .first();

      await tx('transaction_versions')
        .update({
          end_at: db.fn.now(),
        })
        .where({ transaction_version_id: transaction.transaction_version_id });

      const [transaction_version_id] = await tx('transaction_versions')
        .insert({
          transaction_id: transaction_id_unm,
          total_price: last_version.total_price,
          currency: last_version.currency,
          credit_card_type: last_version.credit_card_type,
          credit_card_number: last_version.credit_card_number,
          active: false,
        })
        .returning('transaction_version_id');

      return { transaction_version_id };
    };
    if (this.tx) return run(this.tx);
    return db.transaction(run);
  }
}

export { Transaction };
