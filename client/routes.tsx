import { createRoutesFromElements, Route } from 'react-router-dom'
import App from './components/App.tsx'
import Home from './components/Home'
import Profile from './components/Profile'
import Products from './components/Products.tsx'
import ProductsList from './components/ProductsList.tsx'
import ProductPage from './components/ProductPage.tsx'
import AboutToolr from './components/AboutToolr.tsx'
import Help from './components/Help.tsx'

export default createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="profile" element={<Profile />} />
    <Route path="products" element={<Products />} />
    <Route path="productslist" element={<ProductsList />} />
    <Route path="tools/:id" element={<ProductPage />} />
    <Route path="about" element={<AboutToolr />} />
    <Route path="help" element={<Help />} />
    <Route path="categories" element={<ProductsList />}/>
    <Route path="tool-finder" element={<Help />}/>
  </Route>,
)
