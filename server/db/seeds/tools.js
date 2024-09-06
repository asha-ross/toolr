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
      category: 'Small Power Tools',
    },
    {
      tool_name: 'Lawnmower',
      tool_owner: 2, // Replace with user ID
      description: 'Gas-powered lawnmower for keeping your lawn tidy.',
      image: 'path/to/lawnmower.jpg',
      availability: false, // Set availability to false for a rented tool
      category: 'Yard & Garden',
    },
    {
      tool_name: 'Chainsaw',
      tool_owner: 3, // Replace with user ID
      description:
        'Heavy-duty chainsaw for cutting firewood or clearing brush.',
      image: 'path/to/chainsaw.jpg',
      category: 'Large Power Tools',
    },
    {
      tool_name: 'Gardening Trowel',
      tool_owner: 4, // Replace with user ID
      description: 'A sturdy trowel for planting, weeding, and transplanting.',
      image: 'path/to/trowel.jpg',
      category: 'Yard & Garden',
    },
    {
      tool_name: 'Pruning Shears',
      tool_owner: 5, // Replace with user ID
      description:
        'High-quality pruning shears for trimming branches and shrubs.',
      image: 'path/to/pruning-shears.jpg',
      category: 'Yard & Garden',
    },
    {
      tool_name: 'Wheelbarrow',
      tool_owner: 6, // Replace with user ID
      description:
        'A sturdy wheelbarrow for transporting gardening supplies and materials.',
      image: 'path/to/wheelbarrow.jpg',
      category: 'Yard & Garden',
    },
    {
      tool_name: 'Jigsaw',
      tool_owner: 14, // Replace with user ID
      description: 'A precise jigsaw for cutting curves and intricate shapes.',
      image: 'path/to/jigsaw.jpg',
      category: 'Small Power Tools',
    },
  ])
}
