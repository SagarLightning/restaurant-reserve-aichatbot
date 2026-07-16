import axios from 'axios'
import React, { useState } from 'react'
import { FaFacebook, FaInstagram, FaTwitter, FaReddit, FaYoutube } from 'react-icons/fa'
import { backendURL } from '../App'
import { toast } from 'react-toastify'

const ReservForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",         // ✅ Added this
    time: "",
    guests: "1"
  })

  const handleChanges = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${backendURL}/api/reservations/create`, formData)
      toast.success("Reservation successful")

      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",       // ✅ Reset this too
        time: "",
        guests: "1"
      })
    } catch (error) {
      console.log(error)
      toast.error("Reservation failed. Please try again.")
    }
  }

  const generateTimeSlot = () => {
    const slots = []
    for (let hour = 9; hour < 21; hour++) {
      const startHour = hour % 12 === 0 ? 12 : hour % 12
      const startPeriod = hour < 12 ? "AM" : "PM"

      const endHour = (hour + 1) % 12 === 0 ? 12 : (hour + 1) % 12
      const endPeriod = (hour + 1) < 12 ? "AM" : "PM"

      slots.push(`${startHour}:00 ${startPeriod}-${endHour}:00 ${endPeriod}`)
    }
    return slots
  }

  return (
    <div className='min-h-screen bg-gray-300 p-6 md:p-12'>
      <div className='max-w-6xl mx-auto grid md:grid-cols-3 gap-8'>

        <form onSubmit={handleSubmit} className='md:col-span-2 bg-white p-8 rounded-2xl shadow-md'>
          <h2 className='text-xl font-semibold text-slate-900 tracking-wider'>RESERVE A TABLE</h2>
          <h1 className='text-2xl font-bold mb-4 text-slate-900'>Join us at the table <span className='text-amber-500 hover:underline'>Reserve Now</span></h1>

          <div className='grid md:grid-cols-2 gap-4'>
            <div className='grid gap-1.5'>
              <label className='font-bold'>Full Name</label>
              <input type="text" name='name' value={formData.name} onChange={handleChanges} placeholder='Full Name' required className='w-full p-3 mb-3 border rounded-lg focus:ring focus:ring-blue-300' />
            </div>
            <div className='grid gap-1.5'>
              <label className='font-bold'>Email</label>
              <input type="email" name='email' value={formData.email} onChange={handleChanges} placeholder='Email' required className='w-full p-3 mb-3 border rounded-lg focus:ring focus:ring-blue-300' />
            </div>
            <div className='grid gap-1.5'>
              <label className='font-bold'>Phone Number</label>
              <input type="tel" name='phone' value={formData.phone} onChange={handleChanges} placeholder='Phone Number' required className='w-full p-3 mb-3 border rounded-lg focus:ring focus:ring-blue-300' />
            </div>
            <div className='grid gap-1.5'>
              <label className='font-bold'>Reservation Date</label>
              <input type="date" name='date' value={formData.date} onChange={handleChanges} required className='w-full p-3 mb-3 border rounded-lg focus:ring focus:ring-blue-300' />
            </div>
            <div className='grid gap-1.5'>
              <label className='font-bold'>Time for Reservation</label>
              <select required name='time' value={formData.time} onChange={handleChanges} className='w-full p-3 mb-3 border rounded-lg focus:ring focus:ring-blue-300'>
                <option value="">Select Time</option>
                {generateTimeSlot().map((slot, index) => (
                  <option key={index} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
            <div className='grid gap-1.5'>
              <label className='font-bold'>No. of guests</label>
              <select name='guests' value={formData.guests} onChange={handleChanges} className='w-full p-3 mb-3 border rounded-lg focus:ring focus:ring-blue-300'>
                {[...Array(10).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>{i + 1} Guest(s)</option>
                ))}
              </select>
            </div>
          </div>

          <button type='submit' className='border bg-amber-600 text-[#f5f5f5] font-bold hover:bg-amber-500 transition p-3 w-full mt-4 rounded-2xl'>
            Book Now
          </button>
        </form>

        <div className='bg-black text-gray-200 p-8 rounded-lg shadow-md space-y-10'>
          <div>
            <h3 className='text-lg font-bold'>Address</h3>
            <p>1st Floor, Orion Tower, LBS Marg, Mulund West, Mumbai, Maharashtra 400080 India</p>
          </div>
          <div>
            <h3 className='text-lg font-bold mb-2'>Open Time</h3>
            <p>MON - FRI: 11:00 AM - 10:00 PM</p>
            <p>SAT - SUN: 9:00 AM - 11:00 PM</p>
          </div>
          <div>
            <h3>Stay Connected</h3>
            <div className='flex justify-center gap-4 p-5'>
              <FaFacebook className='text-4xl text-orange-600' />
              <FaInstagram className='text-4xl text-orange-600' />
              <FaReddit className='text-4xl text-orange-600' />
              <FaTwitter className='text-4xl text-orange-600' />
              <FaYoutube className='text-4xl text-orange-600' />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ReservForm
