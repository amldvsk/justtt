exports.up = function (knex) {
  return knex.schema.createTable('customers', (table) => {
    table.increments('customer_id').primary();
    table.string('customer_uuid').unique().notNullable().index();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').notNullable();
    table.string('phone').notNullable();
    table.string('gender').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at').nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('customers');
};
