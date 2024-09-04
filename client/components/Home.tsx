//Home page is the main page, and contains:
//a central search bar, with the placeholder: "what are you looking for today?"
//Also has the Helper Text ("if you don't know what you're looking for, ask our assistant")
//Will take the user to a new page (of products) ONCE they sign in to their profile
//To consider: where is the sign in link, at what point do you select your location?
//Simple design, should have a logo or style that is distinguishable as "toolr" (ie: dark, green, probably a tool icon)

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { addUser } from '../apis/tools'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Users } from '../../models/tools'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')

  const { user, getAccessTokenSilently } = useAuth0()

  const queryClient = useQueryClient()

  const [token, setToken] = useState('')

  useEffect(() => {
    if (user) {
      (async () => {
        const fetchedToken = await getAccessTokenSilently();
        setToken(fetchedToken);
        await addUser({
          auth_id: String(user?.sub),
          username: String(user?.nickname),
          created_at: new Date(),
        }, token);
      })();
    }
  }, [user, getAccessTokenSilently, token]);

  const addUserMutation = useMutation({
    mutationFn: (user: Users) => addUser(user, token),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user'] }),
  })

  // const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
  //  e.preventDefault()
  //  //TODO: Need to input some search logic here
  // }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addUserMutation.mutate({
      auth_id: String(user?.sub),
      username: String(user?.nickname),
      created_at: new Date(),
    })
  }

  return (
    <div className="home">
      <form onSubmit={(event) => handleSubmit(event)} className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="What are you looking for today?"
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <Link to="/tool-finder" className="helper-link">
        Not sure where to start? Click here for our ToolR assistant
      </Link>
    </div>
  );
}


