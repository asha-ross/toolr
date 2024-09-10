import db from '../connection.ts'
import { Transactions } from '../../../models/tools.ts'

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
  console.log('Fetching rentals for borrow_id:', borrower_id)
  try {
    const rentals = await db('transactions')
      .join('users', 'transactions.borrower_id', '=', 'users.id')
      .select(
        'transactions.id',
        'transactions.tool_id',
        'transactions.rental_fee',
        'transactions.start_date',
        'transactions.end_date',
        'transactions.status',
        'transactions.created_at',
      )
      .where('transactions.borrower_id', borrower_id)
      .orderBy('transactions.start_date', 'desc')
    console.log('Rentals found:', rentals)
    return rentals
  } catch (error) {
    console.error('Error fetching rentals:', error)
    throw new Error('Could not retrieve rentals')
  }
}

export async function addRentalTransaction(
  data: Omit<Transactions, 'id'>,
): Promise<Transactions> {
  console.log('Attempting to add rental transaction with data:', data)

  const rentalFee =
    typeof data.rental_fee === 'string'
      ? parseFloat(data.rental_fee.replace('$', ''))
      : data.rental_fee

  if (isNaN(rentalFee)) {
    throw new Error(
      `Invalid rental fee in database function: ${data.rental_fee}`,
    )
  }

  try {
    const [newRental] = await db('transactions')
      .insert({
        ...data,
        rental_fee: rentalFee,
        created_at: new Date().toISOString(),
      })
      .returning('*')

    console.log('Successfully added rental transaction:', newRental)
    return newRental
  } catch (error) {
    console.error('Error in addRentalTransaction:', error)
    throw error
  }
}
