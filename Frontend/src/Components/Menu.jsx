import React, { useContext, useState } from 'react'
import { categoryItem, product } from '../assets/assets'


const Menu = () => {
  const products = product;
  const [category, setCategory]=useState("All")
  
  return (

    <div className='px-4 py-12 max-w-6xl mx-auto'>
      <div className='text-center mb-6'>
        <h1 className='font-bold text-4xl text-slate-950'>Step into our kitchen's imagination</h1>
      </div>

      <div className='text-center mb-8'>
        <h2 className='text-2xl font-medium mb-4 text-slate-900'>See what's brewing behind the scenes</h2>
        <ul className='flex flex-wrap justify-center gap-4'>
          {
            categoryItem.map((item, index)=>(
              <li key={index} onClick={()=>setCategory((prev)=>prev===item.category_titl ?"All":item.category_title)}
              className={`cursor-pointer px-4 font-medium text-sm transition-all duration-200 ${category===item.category_title?"bg-amber-500":"bg-gray-200"} py-2 rounded-full hover:bg-amber-400`}>
                {item.category_title}
              </li>
            ))
          }
        </ul>
      </div>


      <div className='grid grid-cols-1 md:grid-cols-2'>
        {
          products.length>0?(
            products.filter((product)=>category==="All"||category===product.category).map((product)=>
            <div key={product._id} className='flex items-center gap-6 p-4 border border-gray-100 rounded-2xl shadow-sm transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-md'>
              <img src={product.image} alt={product.name}className='h-30 w-30 object-cover rounded-full transition-transform duration-300 hover:scale-105' />
              <div className='flex-1'>
                <div className='flex justify-between items-center '>
                  <h3 className='text-lg font-semibold text-gray-800'>{product.name}</h3>
                  <span className='text-lg font-semibold text-amber-600 relative ml-4'></span>
                  <span className='relative ml-4 text-lg font-semibold text-amber-600 hover:animate-pulse duration-75 before:content-[""] before:absolute before:w-10 before:border-b before:border-dotted before:border-gray-400 before:-left-12 before:top-1/2 before:transform before:-translate-y-1/2 mr-6'>
                    ${product.price}
                  </span>
                </div>
                <p className='text-sm text-gray-500 mt-1'>Lorem ipsum dolor sit.</p>
              </div>
            </div>)
          ):(
            <p className='text-sm col-span-2 text-gray-500'>Currently unavailable | Please check back soon for new products</p>
          )
        }
      </div>
    </div>

  )
}

export default Menu