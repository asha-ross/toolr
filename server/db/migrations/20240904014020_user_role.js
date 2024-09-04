import knex from 'knex'

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('user_role', (table) => {
    table.integer('role_id').notNullable()
    table.integer('user_id').notNullable()
    table.primary(['role_id', 'user_id'])
  })
}

await knex.schema.table('user_role', (table) => {
  table.foreign('role_id').references('id').inTable('roles')
  table.foreign('user_id').references('id').inTable('users')
})

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function down(knex) {
  await knex.schema.dropTable('user_role')
}
