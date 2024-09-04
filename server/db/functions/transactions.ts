import db from '../connection.ts'

export async function getAllRentals() {
  try {
    const rentals = await db('transactions')
      .join('users', 'transactions.borrower_id', '=', 'users.id')
      .select(
        'transactions.tool_id',
        'transactions.tool_name',
        'transactions.rental_fee',
      )

    return rentals
  } catch (error) {
    console.error('Error fetching rentals:', error)
    throw new Error('Could not retrieve rentals')
  }
}

export async function getAllRented() {
  try {
    const rented = await db('transactions')
      .join('users', 'transactions.lender_id', '=', 'users.id')
      .select(
        'transactions.tool_id',
        'transactions.tool_name',
        'transactions.rental_fee',
      )

    return rented
  } catch (error) {
    console.error('Error fetching rented items:', error)
    throw new Error('Could not retrieve rented items')
  }
}
