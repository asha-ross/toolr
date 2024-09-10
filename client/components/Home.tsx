import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { addUser, getTools } from '../apis/tools'
import { useQuery } from '@tanstack/react-query'
import { Tools } from '../../models/tools'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isLoading] = useState(false)
  const [error] = useState<string | null>(null)

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

  const { data: tools } = useQuery<Tools[], Error>({
    queryKey: ['tools'],
    queryFn: getTools,
  })

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)

    const searchFilter = tools?.filter((tool) =>
      tool.tool_name.toLowerCase().includes(value.toLowerCase()),
    )

    setSearchResults(searchFilter)
  }

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
          <ul className="search-results">
            {searchResults.map((item) => (
              <li key={item.id}>
                <Link to={`/tools/${item.id}`} className="search-result-link">
                  {item.tool_name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </form>
      <button type="submit" className="search-button" disabled={isLoading}>
        {isLoading ? 'Searching' : 'Search'}
      </button>
      {error && <p className="error-message">{error}</p>}

      <Link to="/tool-finder" className="helper-link">
        Not sure where to start? Click here for our ToolR assistant
      </Link>
    </div>
  )
}
