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

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function down(knex) {
  await knex.schema.dropTable('user_role')
}