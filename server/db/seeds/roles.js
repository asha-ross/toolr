/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('roles').insert([{ name: 'admin' }, { name: 'user' }])
}
