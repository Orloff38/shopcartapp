
import { createHashRouter, RouterProvider } from 'react-router-dom'

import Home from './pages/home'
import Cart from './pages/cart'
import Layout from './components/Layout/Layout'
import Category from './pages/Category';
import AllItemsPage from './pages/AllItemsPage'
const router = createHashRouter([
  {path: '/', element: <Layout/>, children: [
 {path: '/cart', element: <Cart/>},
  {path: '/', element: <Home/>},
    {path: '/category/:currentCategory', element: <Category/>},
    {path: '/allItems', element: <AllItemsPage/>},
  ]},
 
])

function App() {
 

  return (
    <div className='background'>

    <RouterProvider router={router}/>
    </div>
     
  )
}

export default App
