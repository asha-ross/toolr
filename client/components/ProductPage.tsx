import { useMutation, useQuery, useQueryClient, } from '@tanstack/react-query'
import { Tools } from '../../models/tools'
import { getToolById, changeRentStatus } from '../apis/tools'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

export default function GetSingleProduct() {

  const id = useParams().id

  const queryClient = useQueryClient() 

  const [rentStatus, setRentStatus] = useState<boolean>()


  const rentMutation = useMutation({
    mutationFn: (data: { availability: boolean; id: number }) => changeRentStatus(data.availability, data.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tools'] }),
  });

   const handleRentChange = () => {
    setRentStatus(!rentStatus)
    rentMutation.mutate({ availability: !rentStatus, id: Number(tools?.id) });
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


  return(
    <>
    <div className='product-page-container'>
      <div className='product-info'>
        <div className='product-image'>
        <img src={tools?.image} alt={tools?.tool_name} className='tool-image'/>
        </div>
        <div className='product-details'>
    <h1>{tools?.tool_name}</h1>
    <p>{tools?.description}</p>
    <p>{tools?.availability ? 'Yes':'No'}</p>
    <p>{tools?.price}</p>
    <button onClick={handleRentChange}>Rent out?</button>
    </div>
    </div>
    </div>
    </>
  )

}