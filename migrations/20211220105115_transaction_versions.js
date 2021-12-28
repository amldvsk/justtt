exports.up = function (knex) {
  return knex.schema.createTable('transaction_versions', (table) => {
    table.increments('transaction_version_id').primary();
    table.integer('transaction_id').unsigned().references('transactions.transaction_id').notNullable();
    table.double('total_price').notNullable();
    table.string('currency').notNullable();
    table.string('credit_card_type').notNullable();
    table.string('credit_card_number').notNullable();
    table.boolean('active').defaultTo(true);
    table.timestamp('end_at').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at').nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('transaction_versions');
};
