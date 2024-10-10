/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('user_role').insert([
    { role_id: 1, user_id: 1 }, // Admin role for Janeway
    { role_id: 2, user_id: 2 }, // User role for Chakotay
    { role_id: 2, user_id: 3 }, // User role for Seven of Nine
  ])
}