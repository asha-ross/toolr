//Home page is the main page, and contains:
//a central search bar, with the placeholder: "what are you looking for today?"
//Also has the Helper Text ("if you don't know what you're looking for, ask our assistant")
//Will take the user to a new page (of products) ONCE they sign in to their profile
//To consider: where is the sign in link, at what point do you select your location?
//Simple design, should have a logo or style that is distinguishable as "toolr" (ie: dark, green, probably a tool icon)

import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //TODO: Need to input some search logic here
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
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <Link to="/tool-finder" className="helper-link">
        Not sure where to start? Click here for our ToolR assistant
      </Link>
    </div>
  )
}
