//Home page is the main page, and contains:
//a central search bar, with the placeholder: "what are you looking for today?"
//Also has the Helper Text ("if you don't know what you're looking for, ask our assistant")
//Will take the user to a new page (of products) ONCE they sign in to their profile
//Simple design, should have a logo or style that is distinguishable as "toolr" (ie: dark, green, probably a tool icon)

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

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
      <Link to="/tool-finder" className="helper-link">
        Not sure where to start? Click here for our ToolR assistant
      </Link>
    </div>
  )
}
