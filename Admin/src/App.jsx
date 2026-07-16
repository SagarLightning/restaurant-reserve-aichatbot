// import React, { useEffect, useState } from 'react'
// import Login from './Components/Login'
// import Sidebar from './Components/Sidebar'
// import AddMenu from './pages/AddMenu';
// import ListMenu from './pages/Listmenu';
// import AdminTable from './pages/AdminTable';
// import {Routes, Route} from 'react-router-dom'
// import {ToastContainer} from 'react-toastify'



// const backendUrl='http://localhost:4000'


// const App = () => {
//   const [token, setToken]=useState(localStorage.getItem('token'||""));

//   useEffect(()=>{
//     localStorage.setItem('token', token)
//   },[token])
//   return (
//   <ToastContainer/>
                
//     <div>
//       {
//         token===""?(<Login setToken={setToken}/>):(
//           <>
//             <div>
//               <Sidebar  setToken={setToken}/>
//               <div>
//                 <Routes>
//                   <Route path='/add' element={<AddMenu token={token}/>}/>
//                   <Route path='/list' element={<ListMenu token={token}/>}/>
//                   <Route path='/table' element={<AdminTable token={token}/>}/>
//                 </Routes>
//               </div>
//             </div>
//           </>
//         )
//       }
      
//     </div>
//   )
// }

// export default App


import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AddMenu from './pages/AddMenu';
import AdminTable from './pages/AdminTable';
import ListMenu from './pages/Listmenu';

export const backendURL = 'http://localhost:4000';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer />
      {token === '' ? (
        <Login setToken={setToken} />
      ) : (
        <div className="flex">
          <Sidebar setToken={setToken} />
          <div className="flex-1 ml-64 p-6">
            <Routes>
              <Route path='/' element={<Navigate to="/add" replace />} />
              <Route path='/add' element={<AddMenu token={token} />} />
              <Route path='/list' element={<ListMenu token={token} />} />
              <Route path='/table' element={<AdminTable token={token} />} />
              <Route path='*' element={<Navigate to="/add" replace />} />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;