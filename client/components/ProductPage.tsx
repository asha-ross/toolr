import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Tools, Transactions } from '../../models/tools'
import {
  getToolById,
  changeRentStatus,
  addRentalTransaction,
} from '../apis/tools'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useUser } from './SignedInUser'

export default function GetSingleProduct() {
  const { user } = useAuth0()
  const SignedInUser = useUser()
  const id = useParams().id
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {
    data: tools,
    isLoading,
    error,
  } = useQuery<Tools, Error>({
    queryKey: ['tool', id],
    queryFn: () => getToolById(Number(id)),
  })

  const rentMutation = useMutation({
    mutationFn: async () => {
      if (!tools || !user) throw new Error('Tool or user not available')
      console.log('Tool data:', tools)
      console.log('Tool price:', tools.price)
      await changeRentStatus(false, tools.id)
      //rental transaction:
      const borrowerId = SignedInUser?.id ? Number(SignedInUser.id) : 0
      const rentalFee = parseFloat(tools.price.replace('$', ''))

      if (isNaN(rentalFee)) {
        throw new Error(`Invalid rental fee: ${tools.price}`)
      }

      const rentalData: Omit<Transactions, 'id'> = {
        tool_id: tools.id,
        borrower_id: borrowerId,
        lender_id: tools.tool_owner_id,
        rental_fee: rentalFee,
        start_date: new Date(),
        end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), //ie: 7 days from start date
        status: 'active',
        created_at: new Date(),
      }
      return await addRentalTransaction(rentalData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tool', id] })
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      setIsOpen(false)
      setErrorMessage(null)
    },
    onError: (error: Error) => {
      console.error('Error renting this tool:', error)
      setErrorMessage(error.message)
      setIsOpen(false)
    },
  })

  // Open modal when "Rent out?" is clicked
  const handleRentChange = () => {
    setIsOpen(true)
    setErrorMessage(null)
  }

  // Close modal after confirming rent
  const confirmRent = () => {
    rentMutation.mutate()
  }

  // Close modal without making any changes
  const cancelRent = () => {
    setIsOpen(false)
    setErrorMessage(null)
  }

  if (isLoading) return <div>Loading Tools...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      <div className="product-page-container">
        <div className="product-info">
          <div className="product-image">
            <img
              src={tools?.image}
              alt={tools?.tool_name}
              className="tool-image"
            />
          </div>
          <div className="product-details">
            <h1>{tools?.tool_name}</h1>
            <p>{tools?.description}</p>
            <p>{tools?.availability ? 'Yes' : 'No'}</p>
            <p>{tools?.price}</p>
            <button onClick={handleRentChange}>Rent out?</button>
          </div>
        </div>

        <div
          className="modal-overlay"
          style={{ display: isOpen ? 'flex' : 'none' }}
        >
          <dialog
            open={isOpen}
            onClose={cancelRent}
            className={`modal-container ${isOpen ? 'open' : ''}`}
          >
            <div className="modal-header">
              <h2 className="modal-title">Confirm Tool Choice</h2>
              <button onClick={cancelRent} className="modal-close-button">
                &times;
              </button>
            </div>
            <div className="modal-content">
              <p>Are you sure you want to rent this tool?</p>
              <p>Rental Fee: ${tools?.price}</p>
              <p>Rental Period: 7 days</p>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
            <div className="modal-footer">
              <button onClick={cancelRent} className="modal-button cancel">
                Not yet
              </button>
              <button onClick={confirmRent} className="modal-button confirm">
                Yes
              </button>
            </div>
          </dialog>
        </div>
      </div>
    </>
  )
}
