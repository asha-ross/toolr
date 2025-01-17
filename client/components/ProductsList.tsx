import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Tools } from '../../models/tools'
import { getTools } from '../apis/tools'
import { useEffect, useState } from 'react'

export default function GetAllProducts() {
  const {
    data: tools,
    isLoading,
    error,
  } = useQuery<Tools[], Error>({
    queryKey: ['tools'],
    queryFn: getTools,
  })

  useEffect(() => {
    if (tools) {
      setFilteredTools(tools)
    }
  }, [tools])

  const [filteredTools, setFilteredTools] = useState<Tools[] | undefined>(tools)

  const filterTools = (category: string) => {
    if (category === 'All') {
      setFilteredTools(tools)
    } else {
      const filtered = tools?.filter((tools) =>
        tools.category.includes(category),
      )
      console.log(filtered)
      setFilteredTools(filtered)
    }
  }

  const displayAllTools = () => {
    setFilteredTools(tools)
  }

  if (isLoading) return <div>Loading Tools...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      <div className="products-container">
        <div className="dropdown">
          <button className="dropbtn">Filter by Category</button>
          <div className="dropdown-content">
            <button className="categoryButton" onClick={displayAllTools}>
              All
            </button>
            <button
              className="categoryButton"
              onClick={() => filterTools('Small Power Tools')}
            >
              Small Power Tools
            </button>
            <button
              className="categoryButton"
              onClick={() => filterTools('Yard & Garden')}
            >
              Yard & Garden
            </button>
            <button
              className="categoryButton"
              onClick={() => filterTools('Outdoor Tools')}
            >
              Outdoor Tools
            </button>
            <button
              className="categoryButton"
              onClick={() => filterTools('Carpentry Tools')}
            >
              Carpentry Tools
            </button>
            <button
              className="categoryButton"
              onClick={() => filterTools('Cleaning Tools')}
            >
              Cleaning Tools
            </button>
            <button
              className="categoryButton"
              onClick={() => filterTools('Multi-Tools')}
            >
              Multi-Tools
            </button>
            <button
              className="categoryButton"
              onClick={() => filterTools('Heavy Power Tools')}
            >
              Heavy Power Tools
            </button>
          </div>
        </div>
        <div className="product-list-container">
          {filteredTools &&
            Array.isArray(filteredTools) &&
            filteredTools.length > 0 && (
              <ul className="tools-list">
                {filteredTools.map((tool: Tools) => (
                  <li key={tool.id} className="product-listing">
                    <img
                      src={tool.image}
                      alt={tool.tool_name}
                      className="tool-container"
                    />
                    <Link to={`/tools/${tool.id}`}>
                      <h3 className="tool-link-container">{tool.tool_name}</h3>
                    </Link>
                    <p className="owner-container">Owner: {tool.tool_owner}</p>
                    <p className="availability-container">
                      Available:{tool.availability ? ' Yes' : ' No'}
                    </p>
                  </li>
                ))}
              </ul>
            )}
        </div>
      </div>
    </>
  )
}
