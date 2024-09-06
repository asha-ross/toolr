import { useQuery, } from '@tanstack/react-query'
import { Tools } from '../../models/tools'
import { getToolById, } from '../apis/tools'
import { useParams } from 'react-router-dom'

export default function GetSingleProduct() {

  const id = useParams().id


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
    <h1>Page is Working</h1>
    <p>{tools?.tool_name}</p>
    </>
  )

}