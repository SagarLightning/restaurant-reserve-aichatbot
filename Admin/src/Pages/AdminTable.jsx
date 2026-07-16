// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { backendURL } from '../App'

// const AdminTable = () => {
//   const [reservations, setReservations]=useState([])
//   useEffect(()=>{
//     const fetchReservations=async (params) => {
//       try {
//         const response=await axios.get(backendURL+'/api/reservations/get')
//         setReservations(response.data)
//         console.log(response.data)
//       } catch (error) {
//         console.log("Error fetching reservations")
//       }
//     }
//     fetchReservations()
//   },[])
//   return (
//     <div className='min-h-screen'>
//       <h2 className='text-3xl font-bold text-gray-700 text-center mb-6'>Restaurants Reservations</h2>
//       <div className='overflow-x-auto'>
//         <table className='w-full shadow-lg rounded-xl'>
//           <thead>
//             <tr>
//               <th className='p-3'>Name</th>
//               <th className='p-3'>Email</th>
//               <th className='p-3'>Phone</th>
//               <th className='p-3'>Date</th>
//               <th className='p-3'>Time</th>
//               <th className='p-3'>Guests</th>
//               <th className='p-3'>Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {
//               reservations.length===0?(
//                 <tr>
//                   <td colSpan="7" className='p-4 text-center'>No Reservations found</td>
//                 </tr>
//               ):(
//                 reservations.map((res, index)=>(
//                   <tr key={index} className='border-b hover:bg-gray-50'>
//                     <td className='p-3'>{res.name}</td>
//                     <td className='p-3'>{res.email}</td>
//                     <td className='p-3'>{res.phone}</td>
//                     <td className='p-3'>{res.date}</td>
//                     <td className='p-3'>{res.time}</td>
//                     <td className='p-3'>{res.guests}</td>
                    
//                     <td className='p-3'>
//                       <button className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'>Delete</button>
//                     </td>
//                   </tr>
//                 ))
//               )
//             }
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// export default AdminTable
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendURL } from '../App'

const AdminTable = () => {
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/reservations/get`)
        console.log("Fetched data:", response.data)

        // Handle different response formats
        if (Array.isArray(response.data)) {
          setReservations(response.data)
        } else if (Array.isArray(response.data.data)) {
          setReservations(response.data.data)
        } else {
          console.error("Unexpected response format:", response.data)
          setReservations([])
        }
      } catch (error) {
        console.log("Error fetching reservations", error)
        setReservations([])
      }
    }

    fetchReservations()
  }, [])

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendURL}/api/reservations/delete/${id}`)
      setReservations(prev => prev.filter(res => res._id !== id))
    } catch (error) {
      console.error("Error deleting reservation", error)
    }
  }

  return (
    <div className='min-h-screen p-4'>
      <h2 className='text-3xl font-bold text-gray-700 text-center mb-6'>Restaurant Reservations</h2>
      <div className='overflow-x-auto'>
        <table className='w-full shadow-lg rounded-xl border'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='p-3'>Name</th>
              <th className='p-3'>Email</th>
              <th className='p-3'>Phone</th>
              <th className='p-3'>Date</th>
              <th className='p-3'>Time</th>
              <th className='p-3'>Guests</th>
              <th className='p-3'>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              Array.isArray(reservations) && reservations.length === 0 ? (
                <tr>
                  <td colSpan="7" className='p-4 text-center'>No Reservations found</td>
                </tr>
              ) : (
                Array.isArray(reservations) && reservations.map((res, index) => (
                  <tr key={index} className='border-b hover:bg-gray-50'>
                    <td className='p-3'>{res.name}</td>
                    <td className='p-3'>{res.email}</td>
                    <td className='p-3'>{res.phone}</td>
                    <td className='p-3'>{res.date}</td>
                    <td className='p-3'>{res.time}</td>
                    <td className='p-3'>{res.guests}</td>
                    <td className='p-3'>
                      <button
                        onClick={() => handleDelete(res._id)}
                        className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200'
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminTable
