/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('inventory', table => {
    table.increments('item_id').primary();
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('inventory_users.user_id');
    table.string('itemname');
    table.string('description');
    table.integer('quantity').unsigned();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('inventory');
};
