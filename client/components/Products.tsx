//Products page contains:
//A list of tools available (sorted by distance? relevance?)
//Links to the owner's page (see Owner component)
//Search Results should show up here (from Home page)

import { Link } from 'react-router-dom'
import { Tools } from '../../models/tools'

export default function Products() {
  const { results, searchTerm } = { results: [] as Tools[], searchTerm: '' }

  if (!results) {
    return <div>Loading Tools...</div>
  }

  return (
    <>
      <div className="products-page">
        <h1>Tool Results for {searchTerm}</h1>
        {results.length === 0 ? (
          <p>
            No tools found matching your search. Try a different keyword or
            browse our categories.
          </p>
        ) : (
          <ul className="product-list">
            {results.map((tool: Tools) => (
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
