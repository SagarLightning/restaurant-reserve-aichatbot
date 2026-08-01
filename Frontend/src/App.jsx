import React, { Suspense, lazy } from 'react'
import Navbar from "./Components/Navbar"
import { Route, Routes } from 'react-router-dom'
const Homepage = lazy(() => import('./Pages/Homepage'))
import Footer from "./Components/Footer"
import ChatWidget from "./Components/ChatWidget"
import {ToastContainer} from 'react-toastify'

export const backendURL = 'https://restaurant-reserve-backend-flhe.onrender.com';


const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
        </Routes>
      </Suspense>
      <Footer/>
      <ChatWidget/>
    </div>
  )
}

export default App

