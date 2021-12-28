exports.up = function (knex) {
  return knex.schema.createTable('customer_versions', (table) => {
    table.increments('customer_version_id').primary();
    table.integer('customer_id').unsigned().references('customers.customer_id').notNullable();
    table.string('country').notNullable();
    table.string('city').notNullable();
    table.string('street').notNullable();
    table.boolean('active').defaultTo(true);
    table.timestamp('end_at').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at').nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('customer_versions');
};
