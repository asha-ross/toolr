/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('tools', (table) => {
    table.increments('id').primary()
    table.string('tool_name').notNullable()
    table.string('tool_owner')
    table.integer('tool_owner_id')
    table.text('description')
    table.string('image')
    table.boolean('availability').defaultTo(true)
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.string('category')
    table.string('price')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('tools')
}
