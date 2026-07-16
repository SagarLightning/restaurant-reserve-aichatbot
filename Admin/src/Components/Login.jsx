// import React, { useState } from 'react'
// import { backendUrl } from '../App'
// import {toast } from 'react-toastify'

// const Login = ({setToken}) => {
//   const [email, setEmail]=useState('')
//   const [password, setPassword]=useState('')

//   const onsubmitHandler=async(e)=>{
//     try {
          // e.preventDefault();
          // const response = await axios.post(backendUrl + '/api/user/admin', {email,password })
    //       if(response. data. success){
    //  console. .log(response);
    //  setToken(response. data. token)
      // else{
    //   toast.error(response.error.message)
    // }
//     } catch (error) {
          // console.log(error)
//     }
//   }

//   return (
//     <div>
//       <div className='flex justify-center items-center min-h-screen bg-gray-100'>
//         <div className='bg-white shadow-md rounded-lg px-8 py-6 w-full max-w-md'>
//             <h1 className='text-2xl font-bold text-center mb-4 text-gray-800'>
//                 Admin Login
//             </h1>
//             <form onSubmit={OnSubmitHandler}>
//                 <div className='mb-4'>
//                     <p className='font-semibold text-sm text-gray-600 mb-2'>Email Address</p>
//                     <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email' required className='w-[95%] px-3 py-2 border border-gray-300 text-sm rounded-md focus:outline-none focus:border-b-gray-800' />
//                 </div>
//                 <div className='mb-4'>
//                     <p className='font-semibold text-sm text-gray-600 mb-2'> Password</p>
//                     <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder='Enter Password' required className='w-[95%] px-3 py-2 border border-gray-300 text-sm rounded-md focus:outline-none focus:border-b-gray-800' />
//                 </div>
//                 <button type="submit" className='px-3 py-2 text-lg w-full font-bold bg-amber-500 rounded-md'>Login</button>
//             </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login
import React, { useState } from 'react';
import axios from 'axios';
import { backendURL } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendURL}/api/user/admin`, { email, password });

      if (response.data.success) {
        setToken(response.data.token);
        toast.success("Login successful!");
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 w-full max-w-md'>
        <h1 className='text-2xl font-bold text-center text-gray-800 mb-4'>Admin Login</h1>
        <form onSubmit={onSubmitHandler}>
          <div className='mb-4'>
            <label htmlFor='email' className='text-sm font-semibold text-gray-600 mb-2 block'>Email Address</label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter Email'
              required
              className='w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-gray-800'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='password' className='text-sm font-semibold text-gray-600 mb-2 block'>Password</label>
            <input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter Password'
              required
              autoComplete='off'
              className='w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-gray-800'
            />
          </div>
          <button type='submit' className='w-full px-3 py-2 text-lg font-bold bg-amber-500 rounded-md'>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
