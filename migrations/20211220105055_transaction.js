exports.up = function (knex) {
  return knex.schema.createTable('transactions', (table) => {
    table.increments('transaction_id').primary();
    table.integer('customer_version_id').unsigned().references('customer_versions.customer_version_id').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at').nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('transactions');
};
