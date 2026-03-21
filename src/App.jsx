
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import Cart from './pages/cart'
import Layout from './components/Layout/Layout'
const router = createBrowserRouter([
  {path: '/', element: <Layout/>, children: [
 {path: '/cart', element: <Cart/>},
  {path: '/', element: <Home/>}
  ]},
 
])

function App() {
 

  return (
    <>

    <RouterProvider router={router}/>
    </>
     
  )
}

export default App
