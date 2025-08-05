import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'
import App from './App.jsx'

//import Error from './components/Error.jsx'
//import ProductList from './components/ProductList.jsx'
//import ProductDetail from './components/ProductDetail.jsx'
//import Cart from './components/Cart.jsx'
//import Checkout from './components/Checkout.jsx'
//import OrderConfirmed from './components/OrderConfirmed.jsx'


// Lazy-loaded route components (code-splitting)
const Error = lazy(() => import('./components/Error.jsx'))
const ProductList = lazy(() => import('./components/ProductList.jsx'))
const ProductDetail = lazy(() => import('./components/ProductDetail.jsx'))
const Cart = lazy(() => import('./components/Cart.jsx'))
const Checkout = lazy(() => import('./components/Checkout.jsx'))
const OrderConfirmed = lazy(() => import('./components/OrderConfirmed.jsx'))


//React router configuration for routing to different URLs and Components.
const appRoute = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <ProductList/> 
      },
      {
        path: "/home",
        element: <ProductList/> 
      },
      {
        path: "/products/:category",
        element: <ProductList/> 
      },
      {
        path: "/productDetail/:id/:name",
        element: <ProductDetail/>
      },
      {
        path: "cart",
        element: <Cart/>,
      },
      {
        path: "/cart/checkout",
        element: <Checkout/>
      },
      {
        path: "/orderConfirmed",
        element: <OrderConfirmed/>
      }
    ],
    errorElement: <Error/>
  }
]);


//Render the App.
//Lazy load for optimization.
//Route using React router.

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={appRoute}/>
    </Suspense>
  </StrictMode>,
)