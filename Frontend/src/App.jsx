import React from 'react'
import Navbar from "./Components/Navbar"
import { Route, Routes } from 'react-router-dom'
import Homepage from "./Pages/Homepage"
import Footer from "./Components/Footer"
import ChatWidget from "./Components/ChatWidget"
import {ToastContainer} from 'react-toastify'

export const backendURL = 'http://localhost:4000';


const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
      </Routes>
      <Footer/>
      <ChatWidget/>
    </div>
  )
}

export default App

