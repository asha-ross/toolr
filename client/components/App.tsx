//This page wraps the whole project - the root component.
import { Outlet } from 'react-router-dom'
import Header from './Header.tsx'
import '../styles/main.css'

function App() {
  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  )
}

export default App
