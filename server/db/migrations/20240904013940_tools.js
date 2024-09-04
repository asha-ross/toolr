import knex from "knex"

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('tools', (table) => {
    table.increments('id').primary()
    table.string('tool_name').notNullable()
    table.string('tool_owner')
    table.text('description')
    table.string('image')
    table.boolean('availability').defaultTo(true)
    table.timestamp('created_at').defaultTo(knex.fn.now())
    })
};

// add foreign key constraints after creating all tables 
await knex.schema.table('tools', (table) => {
  table.foreign('tool_owner').references('id').inTable('users')
})

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('tools')
}
