//Home page is the main page, and contains:
//a central search bar, with the placeholder: "what are you looking for today?"
//Also has the Helper Text ("if you don't know what you're looking for, ask our assistant")
//Will take the user to a new page (of products) ONCE they sign in to their profile
//Simple design, should have a logo or style that is distinguishable as "toolr" (ie: dark, green, probably a tool icon)

import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { addUser, checkUserExists } from '../apis/tools'
import { Tools } from '../../models/tools'


export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tools, setTools] = useState([])
  const navigate = useNavigate()

  const { user, getAccessTokenSilently } = useAuth0()


  const [token, setToken] = useState('')

  useEffect(() => {
    if (user) {
      (async () => {
        const fetchedToken = await getAccessTokenSilently();
        setToken(fetchedToken);

        const userExists = await checkUserExists(String(user?.sub), fetchedToken);
        if(!userExists) {
          await addUser({
          auth_id: String(user?.sub),
          username: String(user?.nickname),
          created_at: new Date(),
        }, token)};
      })();
    }
  }, [user, getAccessTokenSilently, token]);


  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    if (!searchTerm.trim()) {
      return
    }
    try {
      const response = await fetch(`/api/v1/tools/search`) //FIX API ENDPOINT
      if (!response.ok) {
        throw new Error('Search failed to return tools')
      }
      const results = await response.json()
      navigate('/search-results', { state: { results, searchTerm } })
    } catch (err) {
      setError('An error occured while searching, please try again.')
    } finally {
      setIsLoading(false)
    }
  }
  const handleShowAllTools = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/v1/tools`) // Assuming this is your API to get all tools
      if (!response.ok) {
        throw new Error('Failed to fetch tools')
      }
      const allTools = await response.json()
      setTools(allTools.tools) // Store the fetched tools in state
    } catch (err) {
      setError('An error occurred while fetching tools, please try again.')
    } finally {
      setIsLoading(false)
    }
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
      <form onSubmit={(event) => handleSearch(event)} className="search-form">
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

      <button onClick={handleShowAllTools} className="show-all-button" disabled={isLoading}>
        {isLoading ? 'Loading tools...' : 'Show all tools'}
      </button>
      {tools.length > 0 && (
        <ul className="tools-list">
          {tools.map((tool: Tools) => (
            <li key={tool.id}>
              <h3>{tool.tool_name}</h3>
              <p>{tool.description}</p>
              <p>Availability: {tool.availability ? 'Available' : 'Not Available'}</p>
            </li>
          ))}
        </ul>
      )}
      <Link to="/tool-finder" className="helper-link">
        Not sure where to start? Click here for our ToolR assistant
      </Link>

    </div>
  );
}


