/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Assuming you have seeded tools, users, and ensured their IDs exist
  await knex('transactions').insert([
    {
      tool_id: 1, // Replace with actual tool ID
      tool_name: 'Bosch Brushless 18V Hammer Drill',
      borrower_id: 2, // Replace with actual borrower user ID
      lender_id: 1, // Replace with actual lender user ID
      start_date: new Date('2024-08-20'), // Replace with actual start date
      end_date: new Date('2024-08-27'), // Replace with actual end date
      rental_fee: 50.0, // Replace with actual rental fee
      status: 'completed', // Can be "active or inactive"
    },
    {
      tool_id: 2, // Replace with actual tool ID
      tool_name: 'Ozito 1200W 305mm Lawn Mower',
      borrower_id: 3, // Replace with actual borrower user ID
      lender_id: 1, // Replace with actual lender user ID
      start_date: new Date('2024-09-02'), // Replace with actual start date
      end_date: new Date('2024-09-09'), // Replace with actual end date
      rental_fee: 75.0, // Replace with actual rental fee
      status: 'pending', // Can be "active or inactive"
    },
  ])
}
