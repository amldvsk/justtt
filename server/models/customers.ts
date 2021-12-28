import { Customer, Customer_Req } from '../interfaces';
import db from '../database/db';

class Customers {
  table = 'customers';
  tx = null;
  constructor(tx: any) {
    this.tx = tx;
  }

  get(customer_id: number | null, customer_uuid: string | null): Promise<Customer> {
    return (this.tx || db)
      .from(this.table)
      .joinRaw('join customer_versions on customer_versions.customer_id = customers.customer_id and end_at is null')
      .where(function (this: any) {
        if (customer_id) {
          this.where({ customer_id });
        }
        if (customer_uuid) {
          this.where({ customer_uuid });
        }
      })
      .first();
  }

  create(obj: Customer_Req): Promise<Customer> {
    const run = async (tx: any) => {
      const [customer_id] = await tx(this.table)
        .insert({
          customer_uuid: obj.customer_uuid,
          first_name: obj.first_name,
          last_name: obj.last_name,
          email: obj.email,
          phone: obj.phone,
          gender: obj.gender,
        })
        .returning('customer_id');
      const [customer_version_id] = await tx('customer_versions')
        .insert({
          customer_id,
          country: obj.country,
          city: obj.city,
          street: obj.street,
        })
        .returning('customer_version_id');
      return { customer_id, customer_version_id };
    };
    if (this.tx) return run(this.tx);
    return db.transaction(run);
  }
}

export { Customers };
