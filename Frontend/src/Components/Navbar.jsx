import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className='flex justify-between p-[2rem] bg-gray-900 text-white'>
        <div>
          <h2 className='font-bold text-3xl'>Lightning <span className='text-amber-600'>Ristorané</span></h2>
        </div>
        <div>
          <ul className='flex justify-between gap-10.5 text-lg text-slate-200'>
            <li className='font-bold cursor-pointertransform transition duration-300 hover:scale-110 hover:text-amber-600'>HOME</li>
            <li className='font-bold cursor-pointertransform transition duration-300 hover:scale-110 hover:text-amber-600'>RESERVATION</li>
            <li className='font-bold cursor-pointertransform transition duration-300 hover:scale-110 hover:text-amber-600'>MENU</li>
            <li className='font-bold cursor-pointertransform transition duration-300 hover:scale-110 hover:text-amber-600'>CONTACT</li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
