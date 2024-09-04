/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Assuming you have an authentication system, replace these with actual auth IDs
  await knex('users').insert([
    {
      auth_id: 'some_auth_id_1',
      username: 'Janeway',
    },
    {
      auth_id: 'some_auth_id_2',
      username: 'Chakotay',
    },
    {
      auth_id: 'some_auth_id_3',
      username: 'Seven of Nine',
    },
  ])
}
