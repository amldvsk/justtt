const data = require('../data.json');

exports.seed = async function (knex) {
  await Promise.all(
    data.map(async (trans) => {
      const [customer_id] = await knex('customers')
        .insert({
          customer_uuid: trans.customer_id,
          first_name: trans.first_name,
          last_name: trans.last_name,
          email: trans.email,
          phone: trans.phone,
          gender: trans.gender,
        })
        .returning('customer_id');

      const [customer_version_id] = await knex('customer_versions')
        .insert({
          customer_id,
          country: trans.country,
          city: trans.city,
          street: trans.street,
        })
        .returning('customer_version_id');

      const [transaction_id] = await knex('transactions').insert({ customer_version_id }).returning('transaction_id');

      const [transaction_version_id] = await knex('transaction_versions')
        .insert({
          transaction_id,
          total_price: trans.total_price,
          currency: trans.currency,
          credit_card_type: trans.cerdit_card_type,
          credit_card_number: trans.cerdit_card_number,
        })
        .returning('transaction_version_id');

      return;
    })
  );
};
