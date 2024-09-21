import React, { lazy, Suspense, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import Header from './components/Header'
import Body from './components/Body'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import About from './components/About'
import Contact from './components/Contact'
import Error from './components/Error'
import Cart from './components/Cart'
import RestaurantMenu from './components/RestaurantMenu'
// import Grocery from './components/Grocery'
import userContext from './utils/userContext'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
// not using keys is <<<<< using index as keys(not recommended )
//use unique key (best practice)
const Grocery = lazy(() => import('./components/Grocery'))
const AppLayout = () => {
  const [userName, setUserName] = useState()
  useEffect(() => {
    const data = { name: 'Sahana Hiremath' }
    setUserName(data.name)
  }, [])
  return (
    <Provider store={appStore}>
      <userContext.Provider value={{ loggedInUSer: userName }}>
        <div className='app'>
          <Header />
          <Outlet />
        </div>
      </userContext.Provider>
    </Provider>
  )
}
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <Body /> },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/grocery',
        element: (
          <Suspense fallback={<h1>Loading....</h1>}>
            <Grocery />
          </Suspense>
        )
      },
      {
        path: '/restaurants/:resId',
        element: <RestaurantMenu />
      },
      {
        path: '/cart',
        element: <Cart />
      }
    ]
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<RouterProvider router={appRouter} />)
