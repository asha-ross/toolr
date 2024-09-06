//Products page contains:
//A list of tools available (sorted by distance? relevance?)
//Links to the owner's page (see Owner component)
//Search Results should show up here (from Home page)

import { Link, useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Tools } from '../../models/tools'
import { fetchTools } from '../apis/tools'

export default function Products() {
  const location = useLocation()
  const searchTerm = new URLSearchParams(location.search).get('search') || ''

  const {
    data: tools,
    isLoading,
    error,
  } = useQuery<Tools[], Error>({
    queryKey: ['tools', searchTerm],
    queryFn: () => fetchTools(searchTerm),
  })

  if (isLoading) return <div>Loading Tools...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      <div className="products-page">
        <h1>{searchTerm ? `Tool Results for "${searchTerm}"` : 'All Tools'}</h1>
        {tools && tools.length === 0 ? (
          <p>
            No tools found{searchTerm && ' matching your search'}. Try a
            different keyword or browse our categories.
          </p>
        ) : (
          <ul className="product-list">
            {tools &&
              tools.map((tool: Tools) => (
                <li key={tool.id} className="product-item">
                  <h2>{tool.tool_name}</h2>
                  <p>{tool.description}</p>
                  <p>Owner: {tool.tool_owner}</p>
                  <img
                    src={tool.image}
                    alt={tool.tool_name}
                    className="tool-image"
                  />
                  <p>
                    Availability:{' '}
                    {tool.availability ? 'Available' : 'Not Available'}
                  </p>
                  <Link to={`/tools/${tool.id}`}>View Details</Link>
                </li>
              ))}
          </ul>
        )}
        <Link to="/" className="back-to-search">
          Back to Search
        </Link>
      </div>
    </>
  )
}
