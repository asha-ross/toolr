import { Outlet } from 'react-router-dom'
import Header from './Header.tsx'
import '../styles/main.css'

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
