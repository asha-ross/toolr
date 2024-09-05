import { createRoutesFromElements, Route } from 'react-router-dom'
import App from './components/App.tsx'
import Home from './components/Home'
//import Categories from './components/Categories.tsx'
import Profile from './components/Profile'
// import Products from './components/Products'
//<Route path="categories" element={<Categories />} />
//<Route path="products" element={<Products />} />

export default createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="profile" element={<Profile />} />
    
  </Route>,
)
