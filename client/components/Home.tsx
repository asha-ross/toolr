//Home page contains:
//a central search bar, with the placeholder: "what tool are you after?"
//Essentially this is a nav bar, with categories
//Will take the user to a new page (of products) ONCE they sign in to their profile
//To consider: where is the sign in link, at what point do you select your location?
//Simple design, should have a logo or style that is distinguishable as "toolr" (ie: dark, green, probably a tool icon)

import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <header>
        <h1>Fullstack Boilerplate - with Fruits!</h1>
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  )
}
