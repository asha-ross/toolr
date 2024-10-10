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
    {
      auth_id: "auth_paris_1",
      username: "Paris"
    },
    {
      auth_id: "auth_kim_2",
      username: "Kim"
    },
    {
      auth_id: "auth_tuvok_3",
      username: "Tuvok"
    },
    {
      auth_id: "auth_neelix_4",
      username: "Neelix"
    },
    {
      auth_id: "auth_doctor_5",
      username: "The Doctor"
    }
  ])
}
