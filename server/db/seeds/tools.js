/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Add some tools with different owners (assuming you have a users table set up)
  await knex('tools').insert([
    {
      tool_name: 'Electric Drill',
      tool_owner: 1, // Replace with user ID
      description:
        'A powerful electric drill perfect for a variety of DIY projects.',
      image: 'path/to/drill.jpg',
    },
    {
      tool_name: 'Lawnmower',
      tool_owner: 2, // Replace with user ID
      description: 'Gas-powered lawnmower for keeping your lawn tidy.',
      image: 'path/to/lawnmower.jpg',
      availability: false, // Set availability to false for a rented tool
    },
    {
      tool_name: 'Chainsaw',
      tool_owner: 3, // Replace with user ID
      description:
        'Heavy-duty chainsaw for cutting firewood or clearing brush.',
      image: 'path/to/chainsaw.jpg',
    },
  ])
}
