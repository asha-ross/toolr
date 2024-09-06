import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Tools } from '../../models/tools'
import { getTools } from '../apis/tools'

export default function GetAllProducts() {
  const {
    data: tools,
    isLoading,
    error,
  } = useQuery<Tools[], Error>({
    queryKey: ['tools'],
    queryFn: getTools,
  })


  if (isLoading) return <div>Loading Tools...</div>
  if (error) return <div>Error: {error.message}</div>

  return(
    <>
      <h1>Page is working</h1>
      {tools && Array.isArray(tools) && tools.length > 0 && (
        <ul className="tools-list">
          {tools.map((tool: Tools) => (
            <li key={tool.id}>
              <Link to={`/tools/${tool.id}`}>
              <h3>{tool.tool_name}</h3>
              </Link>
              <p>{tool.description}</p>
              <p>{tool.tool_owner}</p>
              <img src={tool.image} alt={tool.tool_name} className='tool-container'/>
              <p>
                Available:{tool.availability}
                
              </p>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

