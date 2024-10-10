/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('transactions', (table) => {
    table.increments('id').primary()
    table.integer('tool_id').notNullable()
    table.string('tool_name').notNullable()
    table.integer('borrower_id').notNullable()
    table.integer('lender_id').notNullable()
    table.date('start_date').notNullable()
    table.date('end_date').notNullable()
    table.decimal('rental_fee').notNullable()
    table.string('status').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function down(knex) {
  await knex.schema.dropTable('transactions')
}
