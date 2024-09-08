import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Tools } from '../../models/tools'
import { getToolById, changeRentStatus } from '../apis/tools'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

export default function GetSingleProduct() {
  const id = useParams().id

  const queryClient = useQueryClient()

  //const [rentStatus, setRentStatus] = useState<boolean>()
  const [isOpen, setIsOpen] = useState(false)

  const rentMutation = useMutation({
    mutationFn: (data: { availability: boolean; id: number }) =>
      changeRentStatus(data.availability, data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tool', id] })
      window.location.reload()
    },
  })

  /*
   const handleRentChange = () => {
    setRentStatus(!rentStatus)
    rentMutation.mutate({ availability: !rentStatus, id: Number(tools?.id) });
  }
  */

  // Open modal when "Rent out?" is clicked
  const handleRentChange = () => {
    setIsOpen(true)
  }

  // Close modal after confirming rent
  const confirmRent = () => {
    if (tools) {
      rentMutation.mutate({ availability: false, id: tools.id }) // Set availability to false (renting out)
      setIsOpen(false)
    }
  }

  // Close modal without making any changes
  const cancelRent = () => {
    setIsOpen(false)
  }

  const {
    data: tools,
    isLoading,
    error,
  } = useQuery<Tools, Error>({
    queryKey: ['tool'],
    queryFn: () => getToolById(Number(id)),
  })

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
