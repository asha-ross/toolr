//Home page is the main page, and contains:
//a central search bar, with the placeholder: "what are you looking for today?"
//Also has the Helper Text ("if you don't know what you're looking for, ask our assistant")
//Will take the user to a new page (of products) ONCE they sign in to their profile
//Simple design, should have a logo or style that is distinguishable as "toolr" (ie: dark, green, probably a tool icon)

import React, { useState, useEffect } from 'react'
// import { useQuery } from '@tanstack/react-query'
// import { getTools } from '../apis/tools'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { addUser, getTools } from '../apis/tools'
import { useQuery } from '@tanstack/react-query'
import { Tools } from '../../models/tools'
// import { Tools } from '../../models/tools'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
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

        await addUser(
          {
            auth_id: String(user?.sub?.split('|')[1]),
            username: String(user?.nickname),
            created_at: new Date(),
          },
          token,
        )
      })()
    }
  }, [user, getAccessTokenSilently, token])

  /* ╔═════════════╗ */
  /* ║   Andrew    ║ */
  /* ╚═════════════╝ */

  // Had a crack at the search

  const {
    data: tools,
  } = useQuery<Tools[], Error>({
    queryKey: ['tools'],
    queryFn: getTools,
  })

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);


    const searchFilter = tools?.filter((tool) =>
      tool.tool_name.toLowerCase().includes(value.toLowerCase())
    );

    setSearchResults(searchFilter);
  };

  const handleResultClick = (id: number) => {
    // Navigate to the specific tool's page using its id
    navigate(`/api/v1/tools/${id}`);
  };



  // const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   setIsLoading(true)
  //   setError(null)
  //   if (!searchTerm.trim()) {
  //     setIsLoading(false)
  //     return
  //   }
  //   navigate(`/products?search=${encodeURIComponent(searchTerm)}`)
  //   setIsLoading(false)
  // }

  /* ╔═════════════╗ */
  /* ║   Andrew    ║ */
  /* ╚═════════════╝ */

    // Removed the button function to display tools on home screen. New component added instead

  // const {
  //   data: tools,
  //   isLoading: isLoadingTools,
  //   error: toolsError,
  //   refetch: refetchTools,
  // } = useQuery({
  //   queryKey: ['allTools'],
  //   queryFn: getTools,
  //   enabled: false,
  // })




  // const handleShowAllTools = () => {
  //   refetchTools()
  // }

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
          onChange={handleSearch}
          placeholder="What are you looking for today?"
          className="search-input"
        />
        {searchTerm && (
        <ul>
          {searchResults.map((item) => (
            <li
              key={item.id}
              onClick={() => handleResultClick(item.id)} // Call handleResultClick with the id on click
              style={{ cursor: 'pointer' }} // Add a pointer cursor for better UX
            >
              {item.tool_name}
            </li>
          ))}
        </ul>
      )}
      </form>
      <button type="submit" className="search-button" disabled={isLoading}>
          {isLoading ? 'Searching' : 'Search'}
        </button>
      {error && <p className="error-message">{error}</p>}
      <Link to="/productslist">
        <button className="show-all-button">Show all tools</button>
      </Link>

      <Link to="/tool-finder" className="helper-link">
        Not sure where to start? Click here for our ToolR assistant
      </Link>
    </div>
  )
}
