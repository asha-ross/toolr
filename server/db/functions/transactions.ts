import db from '../connection.ts'
// import { Transactions } from '../../../models/tools.ts'

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

export async function getRentalsByBorrower(borrower_id: number) {
  try {
    const rentals = await db('transactions')
      .join('users', 'transactions.borrower_id', '=', 'users.id')
      .select(
        'transactions.id as transaction_id',
        'transactions.tool_id',
        'transactions.rental_fee',
        'transactions.start_date',
        'transactions.end_date',
      )
      .where('transactions.borrower_id', borrower_id)
      .orderBy('transactions.start_date', 'desc')
    return rentals
  } catch (error) {
    console.error('Error fetching rentals:', error)
    throw new Error('Could not retrieve rentals')
  }
}
