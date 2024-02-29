import React, { Suspense, useContext, useEffect } from 'react' 
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Componants/Layout.jsx'
import Login from './Componants/Login/Login.jsx'
import Register from "./Componants/Register/Register.jsx"
import Home from './Componants/Home/Home.jsx'

import Categories from './Componants/Categories/Categories.jsx'
import Brands from './Componants/Brands/Brands.jsx'
import Cart from './Componants/Cart/Cart.jsx'
import NotFound from './Componants/NotFound.jsx'
import { userContext } from './UserContext.js'
import ProtectedRoute from './Componants/ProtectedRoute.js'
import ProductDetails from './Componants/ProductDetails.jsx'
import Orders from './Orders.jsx'
import { lazy } from "react";
import Loading from './Componants/Loading.jsx'
import ForgetPass from './Componants/ForgetPass/ForgetPass.jsx'
import ResetPass from './Componants/ResetPass/ResetPass.jsx'
import Wishlist from './Componants/Wishlist/Wishlist.jsx'
const Products = lazy(() => import("./Componants/Products/Products.jsx"));






export default function App() {
  let {setIsUser,setLogin}=useContext(userContext)
  useEffect(()=>{
    if(localStorage.getItem('userToken')){
      setIsUser(localStorage.getItem('userToken'));
      setLogin(localStorage.getItem('userName'))
    }
  },[])

 

  const routes = createBrowserRouter( [
    {path:'', element:<Layout></Layout>, children:[
      {index:true, element:<Login></Login>},
      {path:'forgetPassword',element:<ForgetPass></ForgetPass>},
      {path:'resetPassword',element:<ResetPass></ResetPass>},
      {path:'register',element:<Register></Register>},
      {path:'home',element: <ProtectedRoute><Home></Home></ProtectedRoute>},
      {path:'wishlist',element: <ProtectedRoute><Wishlist></Wishlist></ProtectedRoute>},
      {path:'products',element:<ProtectedRoute><Suspense fallback={<Loading></Loading>}><Products></Products></Suspense></ProtectedRoute>},
      {path:'productDetails/:id',element:<ProtectedRoute><ProductDetails></ProductDetails></ProtectedRoute>},
      {path:'brands',element:<ProtectedRoute><Brands></Brands></ProtectedRoute>},
      {path:'cart',element:<ProtectedRoute><Cart></Cart></ProtectedRoute>},
      {path:'categories',element:<ProtectedRoute><Categories></Categories></ProtectedRoute>},
      {path:'allorders',element:<ProtectedRoute><Orders></Orders></ProtectedRoute>},
      {path:'*',element:<NotFound></NotFound>}

    ]}
  ],{basename:"/FreshCart"})
  return (
   <RouterProvider router={routes}></RouterProvider>
  )
}

