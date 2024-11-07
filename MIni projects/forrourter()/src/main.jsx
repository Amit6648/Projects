import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './componets/Layout.jsx'
import Home from './componets/Home.jsx'
import './index.css';
import Aboutus from './componets/Aboutus.jsx'
import Contactus from './componets/Contactus.jsx'
import User from './componets/User.jsx'
import Github from './componets/Github.jsx'

// const router = createBrowserRouter(
// [
//   {
//     path: "/",
//     element: <Layout/>,
//     children:[
//       {
//         path: "",
//         element :<Home/>
//       },
//       {
//         path:"about",
//         element: <Aboutus/>
//       },
//       {
//         path: "contact",
//         element: <Contactus/>
//       }
//     ]
//   }
// ]
// )

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
    <Route path='' element={<Home/>}></Route>
    <Route path='about' element={<Aboutus/>}></Route>
    <Route path='contact' element={<Contactus/>}></Route>
    <Route path='user/:id' element={<User/>}></Route>
    <Route path='Github' element={<Github/>}> </Route>
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}/> 
  </StrictMode>,
)
