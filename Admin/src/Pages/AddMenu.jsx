// import React, { useState } from 'react'
// import upload_img from '../assets/Upload-Icon.png'

// const [image, setImage]=useState(null)

// const AddMenu=({token})=> {
//   return (
//     <div>
//       <form > 
//         <div>
//           <p>Upload Image</p>
//           <div>
//             <label htmlFor="image">
//             <img src={!image ? upload_img: URL.createObjectURL(image)} alt="" />
//             <input type="file"  id="image" hidden />
//             </label>
//           </div>
//         </div>

//         <div>
//           <p>Product Name</p>
//           <input type="text" placeholder='Enter Product Name' required/>
//         </div>
//         <div>
//           <p>Product Description</p>
//           <input type="text" placeholder='Enter Product Description' required/>
//         </div>

//         <div>
//           <div>
//             <p>Product Category</p>
//             <select >
//               <option value="All">All</option>
//               <option value="Spagetti">Spagetti</option>
//               <option value="Pizza">Pizza</option>
//               <option value="Rice">Rice</option>
//               <option value="Noodles">Noodles</option>
//               <option value="Chicken">Chicken</option>
//               <option value="Drinks">Drinks</option>
//             </select>
//           </div>
//         </div>

//         <div>
//           <p>
//             Product Price
//           </p>
//           <input type="number" placeholder='40' />
//         </div>
//         <button type='submit'>Add Menu</button>
//       </form>
//     </div>
//   )
// }

// export default AddMenu

import React, { useState } from 'react'
import upload_img from '../assets/Upload-Icon.png'
import axios from 'axios'
import { backendURL } from '../App'
import { toast } from 'react-toastify'

const AddMenu = ({ token }) => {
  const [image, setImage] = useState(null)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("All")
  
  // Phase 2 Metadata States
  const [cuisine, setCuisine] = useState("Italian")
  const [vegetarian, setVegetarian] = useState(false)
  const [vegan, setVegan] = useState(false)
  const [spicy, setSpicy] = useState(false)
  const [calories, setCalories] = useState("")
  const [protein, setProtein] = useState("")
  const [tags, setTags] = useState("")

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      // Phase 2 Metadata
      formData.append("cuisine", cuisine)
      formData.append("vegetarian", vegetarian)
      formData.append("vegan", vegan)
      formData.append("spicy", spicy)
      formData.append("calories", calories)
      formData.append("protein", protein)
      formData.append("tags", tags)

      if (image) formData.append("image", image)

      const response = await axios.post(`${backendURL}/api/product/add`, formData, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        setName("")
        setDescription("")
        setPrice("")
        setCategory("All")
        setCuisine("Italian")
        setVegetarian(false)
        setVegan(false)
        setSpicy(false)
        setCalories("")
        setProtein("")
        setTags("")
        setImage(null)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div className='p-4 max-w-4xl'>
      <form onSubmit={onSubmitHandler} className='flex flex-col items-start gap-4'>
        <div>
          <p className='mb-2 text-lg font-semibold'>Upload Image</p>
          <div>
            <label htmlFor="image">
              <img src={!image ? upload_img : URL.createObjectURL(image)} alt="" className='w-32 cursor-pointer border rounded-lg p-1 bg-gray-50' />
              <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
            </label>
          </div>
        </div>

        <div className='w-full'>
          <p className='mb-1 text-lg font-semibold'>Product Name</p>
          <input value={name} onChange={(e) => setName(e.target.value)} className='w-full max-w-[500px] p-3 border border-gray-300 rounded-lg' type="text" placeholder='Enter Product Name' required />
        </div>

        <div className='w-full'>
          <p className='mb-1 text-lg font-semibold'>Product Description</p>
          <input value={description} onChange={(e) => setDescription(e.target.value)} className='w-full max-w-[500px] p-3 border border-gray-300 rounded-lg' type="text" placeholder='Enter Product Description' required />
        </div>

        <div className='flex flex-wrap gap-6 w-full max-w-[500px]'>
          <div className='flex-1 min-w-[200px]'>
            <p className='mb-1 text-lg font-semibold'>Category</p>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className='w-full p-3 border border-gray-300 rounded-lg'>
              <option value="All">All</option>
              <option value="Spagetti">Spagetti</option>
              <option value="Pizza">Pizza</option>
              <option value="Rice">Rice</option>
              <option value="Noodles">Noodles</option>
              <option value="Chicken">Chicken</option>
              <option value="Drinks">Drinks</option>
            </select>
          </div>

          <div className='flex-1 min-w-[200px]'>
            <p className='mb-1 text-lg font-semibold'>Cuisine</p>
            <select value={cuisine} onChange={(e) => setCuisine(e.target.value)} className='w-full p-3 border border-gray-300 rounded-lg'>
              <option value="Italian">Italian</option>
              <option value="Indian">Indian</option>
              <option value="Chinese">Chinese</option>
              <option value="Mexican">Mexican</option>
              <option value="American">American</option>
              <option value="Continental">Continental</option>
              <option value="Asian">Asian</option>
            </select>
          </div>
        </div>

        <div className='flex flex-wrap gap-6 w-full max-w-[500px]'>
          <div className='flex-1'>
            <p className='mb-1 text-lg font-semibold'>Price (₹)</p>
            <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder='e.g. 150' className='w-full p-3 border border-gray-300 rounded-lg' required />
          </div>
          <div className='flex-1'>
            <p className='mb-1 text-lg font-semibold'>Calories (kcal)</p>
            <input value={calories} onChange={(e) => setCalories(e.target.value)} type="number" placeholder='e.g. 450' className='w-full p-3 border border-gray-300 rounded-lg' />
          </div>
          <div className='flex-1'>
            <p className='mb-1 text-lg font-semibold'>Protein (g)</p>
            <input value={protein} onChange={(e) => setProtein(e.target.value)} type="number" placeholder='e.g. 18' className='w-full p-3 border border-gray-300 rounded-lg' />
          </div>
        </div>

        <div className='w-full max-w-[500px]'>
          <p className='mb-1 text-lg font-semibold'>Tags (comma-separated)</p>
          <input value={tags} onChange={(e) => setTags(e.target.value)} className='w-full p-3 border border-gray-300 rounded-lg' type="text" placeholder='e.g. romantic, dinner, kids, cheesy, healthy' />
        </div>

        {/* Dietary Checkboxes */}
        <div className='flex gap-6 items-center p-3 bg-gray-50 border rounded-lg w-full max-w-[500px]'>
          <label className='flex items-center gap-2 cursor-pointer font-medium'>
            <input type="checkbox" checked={vegetarian} onChange={(e) => setVegetarian(e.target.checked)} className='w-5 h-5 text-amber-500' />
            Vegetarian 🥗
          </label>
          <label className='flex items-center gap-2 cursor-pointer font-medium'>
            <input type="checkbox" checked={vegan} onChange={(e) => setVegan(e.target.checked)} className='w-5 h-5 text-amber-500' />
            Vegan 🌱
          </label>
          <label className='flex items-center gap-2 cursor-pointer font-medium'>
            <input type="checkbox" checked={spicy} onChange={(e) => setSpicy(e.target.checked)} className='w-5 h-5 text-amber-500' />
            Spicy 🌶️
          </label>
        </div>

        <button type='submit' className='mt-4 px-12 py-3.5 bg-amber-500 text-white font-bold text-lg rounded-lg shadow-md hover:bg-amber-600 transition'>
          Add Menu Item
        </button>
      </form>
    </div>
  )
}

export default AddMenu
