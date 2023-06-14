import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';


/* Importing all components*/

import Username from './components/Username';
import Password from './components/Password';
import Register from './components/Register';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import PageNotFound from './components/PageNotFound';

/* root router */
const router = createBrowserRouter([
  {
    path: '/',
    element: <div> Root Route </div>
  },

  {
    path:'/register',
    element:<div>Register Route</div>
  },

])
const App = () => {
  return (
   <main>
    <RouterProvider router = {router}>

    </RouterProvider>
   </main>
  )
}

export default App