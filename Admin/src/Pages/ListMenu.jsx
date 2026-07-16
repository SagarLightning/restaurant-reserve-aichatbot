// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { backendURL } from '../App'
// import { toast } from 'react-toastify'
// import { MdDeleteForever } from 'react-icons/md'

// function ListMenu({token}) {
//   const [list, setList]=useState([])
//   const fetchList=async()=>{
//     try {
//       const response=await axios.get(backendURL + '/api/product/list', {headers:{token}})
//       if(response.data.success){
//         setList(response.data.products)
//       }
//       else{
//         toast.error(response.data.message)
//       }
//     } catch (error) {
//       console.log(error)
//       toast.error(error.message)
//     }
//   }

//   useEffect(()=>{
//     fetchList()
//   },[])

//   return (
//     <div>
//       <p>Menu List</p>
//       <div>
//         <div>
//           <b>Image</b>
//           <b>Name</b>
//           <b>Category</b>
//           <b>Price</b>
//           <b>Action</b>
//         </div>

//         {list.map((item, index)=>
//           <div key={index}>
//             <img src={item.image} alt="" />
//             <p>{item.name}</p>
//             <p>{item.category}</p>
//             <p>{item.price}</p>
//             <MdDeleteForever/>

//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default ListMenu
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendURL } from '../App'
import { toast } from 'react-toastify'
import { MdDeleteForever } from 'react-icons/md'

function ListMenu({ token }) {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const fetchList = async () => {
    setLoading(true)
    try {
      const response = await axios.get(backendURL + '/api/product/list', {
        headers: { token },
      })

      if (response.data.success && Array.isArray(response.data.message)) {
        setList(response.data.message)
      } else {
        toast.error(response.data.message || 'Unexpected response format')
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const deleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return

    try {
      // const response = await axios.delete(`${backendURL}/api/product/delete/${id}`, {
      //   headers: { token },
      // })
      const response = await axios.post(`${backendURL}/api/product/remove`, { _id: id }, {
        headers: { token },
      })

      if (response.data.success) {
        toast.success('Product deleted')
        setList(list.filter((item) => item._id !== id))
      } else {
        toast.error(response.data.message || 'Delete failed')
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong')
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  // Filtered and grouped list
  const filteredList = list.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const groupedByCategory = filteredList.reduce((acc, item) => {
    const category = item.category || 'Uncategorized'
    if (!acc[category]) acc[category] = []
    acc[category].push(item)
    return acc
  }, {})

  return (
    <div style={{ padding: '20px' }}>
      <h2>Menu List</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          padding: '8px',
          width: '100%',
          maxWidth: '300px',
          marginBottom: '20px',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />

      {loading ? (
        <p>Loading...</p>
      ) : Object.keys(groupedByCategory).length > 0 ? (
        Object.entries(groupedByCategory).map(([category, items]) => (
          <div key={category} style={{ marginBottom: '30px' }}>
            <h3 style={{ marginBottom: '10px', color: '#333' }}>{category}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr 1fr', gap: '10px', fontWeight: 'bold', borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>
              <span>Image</span>
              <span>Name</span>
              <span>Price</span>
              <span>Description</span>
              <span>Action</span>
            </div>

            {items.map((item) => (
              <div
                key={item._id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 2fr 1fr 1fr 1fr',
                  gap: '10px',
                  alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: '1px solid #eee',
                }}
              >
                <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                <p>{item.name}</p>
                <p>₹{item.price}</p>
                <p>{item.description}</p>
                <MdDeleteForever
                  size={24}
                  style={{ cursor: 'pointer', color: 'red' }}
                  onClick={() => deleteProduct(item._id)}
                />
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  )
}

export default ListMenu
