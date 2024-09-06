//Home page is the main page, and contains:
//a central search bar, with the placeholder: "what are you looking for today?"
//Also has the Helper Text ("if you don't know what you're looking for, ask our assistant")
//Will take the user to a new page (of products) ONCE they sign in to their profile
//Simple design, should have a logo or style that is distinguishable as "toolr" (ie: dark, green, probably a tool icon)

import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getTools } from '../apis/tools'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { addUser, checkUserExists } from '../apis/tools'
import { Tools } from '../../models/tools'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const { user, getAccessTokenSilently } = useAuth0()

  const [token, setToken] = useState('')

  useEffect(() => {
    if (user) {
      ;(async () => {
        const fetchedToken = await getAccessTokenSilently()
        setToken(fetchedToken)

        const userExists = await checkUserExists(
          String(user?.sub),
          fetchedToken,
        )
        if (!userExists) {
          await addUser(
            {
              auth_id: String(user?.sub),
              username: String(user?.nickname),
              created_at: new Date(),
            },
            token,
          )
        }
      })()
    }
  }, [user, getAccessTokenSilently, token])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    if (!searchTerm.trim()) {
      setIsLoading(false)
      return
    }
    navigate(`/products?search=${encodeURIComponent(searchTerm)}`)
    setIsLoading(false)
  }

  const {
    data: tools,
    isLoading: isLoadingTools,
    error: toolsError,
    refetch: refetchTools,
  } = useQuery({
    queryKey: ['allTools'],
    queryFn: getTools,
    enabled: false,
  })

  const handleShowAllTools = () => {
    refetchTools()
  }

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   addUserMutation.mutate({
  //     auth_id: String(user?.sub),
  //     username: String(user?.nickname),
  //     created_at: new Date(),
  //   })
  // }

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="What are you looking for today?"
          className="search-input"
        />
        <button type="submit" className="search-button" disabled={isLoading}>
          {isLoading ? 'Searching' : 'Search'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}

      <button
        onClick={handleShowAllTools}
        className="show-all-button"
        disabled={isLoadingTools}
      >
        {isLoadingTools ? 'Loading tools...' : 'Show all tools'}
      </button>
      {toolsError && <p className="error-message">{toolsError.message}</p>}
      {tools && Array.isArray(tools) && tools.length > 0 && (
        <ul className="tools-list">
          {tools.map((tool: Tools) => (
            <li key={tool.id}>
              <h3>{tool.tool_name}</h3>
              <p>{tool.description}</p>
              <p>
                Availability:{' '}
                {tool.availability ? 'Available' : 'Not Available'}
              </p>
            </li>
          ))}
        </ul>
      )}
      <Link to="/tool-finder" className="helper-link">
        Not sure where to start? Click here for our ToolR assistant
      </Link>
    </div>
  )
}
